/**
 * Angular version 13
 * Lucas Costa, junho de 2022
 */

import {
  Directive,
  ElementRef,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

interface Base64 {
  name: string;
  data: string;
  length: number;
  lengthFile: string;
}

enum Status {
  UPLOADING = 'uploading',
  DONE = 'done',
  ERROR = 'error',
}

interface Progress {
  name: string; // nome do arquivo
  status: Status; // 'uploading', 'done', 'error'
  progress: number; // percentual de 0  a 100 (%)
  length: number; // tamanho total do arquivo em bytes
  lengthFile: string; // tamanho total do arquivo Formatado para SI
  size: number; // tamnho atual do arquivo em bytes
  sizeFile: string; // tamanho atual do arquivo Formatado para SI
  base64: Base64; // base64 do arquivo
}

interface Upload {
  update: Progress; // eventos de atualização do upload
  currentFile: Progress; // arquivo de upload atual
  files: Progress[]; // arquivos de upload
}

@Directive({
  selector: 'input[type=file]',
})
export class InputFileDirective {
  // Measurements
  @Output() number: EventEmitter<Number> = new EventEmitter<Number>(); // numero total de arquivos
  @Output() length: EventEmitter<Number> = new EventEmitter<Number>(); // tamnaho total da soma dos arquivos em bytes
  @Output() lengthFiles: EventEmitter<String> = new EventEmitter<String>(); // tamanho total da soma dos arquivos formtada para prefixos SI

  // Entities
  @Output() files: EventEmitter<File[]> = new EventEmitter<File[]>();
  @Output() fileList: EventEmitter<FileList> = new EventEmitter<FileList>();
  @Output() base64: EventEmitter<Array<Base64>> = new EventEmitter<
    Array<Base64>
  >();

  // Events
  @Output() size: EventEmitter<String> = new EventEmitter<String>(); // tamanho atual da soma dos arquivos em bytes
  @Output() sizeFiles: EventEmitter<String> = new EventEmitter<String>(); // tamanho atual da soma dos arquivos formatado par SI
  @Output() update: EventEmitter<Upload> = new EventEmitter<Upload>(); // atualiza o progresso de todos os asrquivos
  @Output() progress: EventEmitter<Number> = new EventEmitter<Number>(); // atualliza a porcentagem do progrresso total
  @Output() preview: EventEmitter<Base64[]> = new EventEmitter<Base64[]>(); // atualiza a cada base64 gerado

  private inpurElement: HTMLInputElement;

  // measurements
  private numberLocal: number = 0; // numero total de arqiovos
  private lengthLocal: number = 0; // tamnaho total da soma dos arquivos em bytes
  private lengthFilesLocal: string = '0 KB'; // tamanho total da soma dos arquivos formtada para prefixos SI

  // Events
  private sizeLocal: number = 0;
  private sizeFileLocal: string = '0 KB';

  // Entities
  private filesListEntity: any;
  private filesEntities: File[] = [];
  private base64Entities: Base64[] = <Array<Base64>>[];

  private uploadLocal: Upload = {
    files: <Progress[]>[],
    currentFile: <Progress>{
      name: '',
      status: Status.UPLOADING,
      progress: 0,
      length: 0,
      lengthFile: '0 KB',
      size: 0,
      sizeFile: '0 KB',
    },
    update: <Progress>{
      name: 'global',
      status: Status.UPLOADING,
      progress: 0,
      length: 0,
      lengthFile: '0 KB',
      size: 0,
      sizeFile: '0 KB',
    },
  };

  constructor(private el: ElementRef) {
    this.inpurElement = this.el.nativeElement;
    this.inpurElement.addEventListener('change', this.onChange.bind(this));
  }

  /**
   * Evento de mudança no input
   * @param e {Event}
   */
  async onChange(e: any) {
    this.filesListEntity = e.target.files;
    this.numberLocal = this.filesListEntity.length;

    this.filesEntities = this.filesToArray(this.filesListEntity);

    this.number.emit(this.numberLocal);
    this.length.emit(this.lengthLocal);
    this.lengthFiles.emit(this.lengthFilesLocal);

    this.fileList.emit(this.filesListEntity);
    this.files.emit(this.filesEntities);

    this.base64Entities = await this.filesToBase64(this.filesEntities);
    this.base64.emit(this.base64Entities);
  }

  /**
   * Converte um FileList para um array de File
   * @param files {FileList}
   */
  private filesToArray(files: FileList) {
    let filesArray: File[] = [];
    let lengthFiles = 0;

    Object.keys(files).map(async (keyFile: any) => {
      let fileEntity: File = files[keyFile];

      if (!fileEntity) {
        return false;
      }

      let length: number = fileEntity.size;
      let lengthFile = this.formatToBytes(length);
      Object.defineProperty(fileEntity, 'length', {
        value: length,
        writable: true,
      });
      Object.defineProperty(fileEntity, 'lenghFile', {
        value: lengthFile,
        writable: true,
      });

      lengthFiles += length;
      filesArray.push(fileEntity);

      return;
    });

    this.lengthLocal = lengthFiles;
    this.lengthFilesLocal = this.formatToBytes(lengthFiles);

    return filesArray;
  }

  /**
   * Roda um upload por vez de cada arquivo
   * @param files {File[]}
   */
  private async filesToBase64(files: File[]): Promise<Base64[]> {
    const length = this.lengthLocal;
    const lengthFile = this.lengthFilesLocal;

    // reseta o estado global do upload
    this.uploadLocal.files = <Progress[]>[];
    this.uploadLocal.update = <Progress>{
      name: 'global',
      status: Status.UPLOADING,
      progress: 0,
      size: 0,
      sizeFile: '0 KB',
      length,
      lengthFile,
    };

    this.base64Entities = <Array<Base64>>[];

    // roda um uoload por vez
    for await (const file of files) {
      let base64: Base64 = await this.fileToBase64(<File>file);
      this.base64Entities.push(base64);
      this.preview.emit(this.base64Entities);
    }

    return this.base64Entities;
  }

  /**
   * Faz o stream de um arquivo para base64
   * Emite os evento de prograsso do upload
   * @param file {File}
   */
  private fileToBase64(file: File): Promise<Base64> {
    return new Promise<Base64>((resolve: any, reject: any) => {
      const status = Status.UPLOADING;
      const { name, size: length } = file;
      const lengthFile = this.formatToBytes(length);
      const sizeFile = this.formatToBytes(0);

      // reseta o estado corrente do upload
      this.uploadLocal.currentFile = <Progress>{
        progress: 0,
        size: 0,
        sizeFile: sizeFile,
        status,
        length,
        name,
        lengthFile,
      };

      this.uploadLocal.files.push(this.uploadLocal.currentFile);

      if (this.uploadLocal.update.status !== Status.ERROR) {
        this.uploadLocal.update.status = status;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);

      // emite os eventos de progresso
      this.progress.emit(this.uploadLocal.update.progress);
      this.update.emit(this.uploadLocal);

      // atuliza os eventos de progresso
      reader.onprogress = (event: any) => {
        const size = event.loaded;
        // pega o valor do progresso
        let diff = size - this.uploadLocal.currentFile.size;

        // atualiza o upload do arquivo atual
        this.uploadLocal.currentFile.size = size;
        this.uploadLocal.currentFile.sizeFile = this.formatToBytes(size);
        this.uploadLocal.currentFile.progress = this.percent(
          this.uploadLocal.currentFile.length,
          size
        );

        // atualiza o upload global
        this.uploadLocal.update.size += diff;
        this.uploadLocal.update.sizeFile = this.formatToBytes(
          this.uploadLocal.update.size
        );
        this.uploadLocal.update.progress = this.percent(
          this.uploadLocal.update.length,
          this.uploadLocal.update.size
        );

        // atuliaza o upload no array
        this.uploadLocal.files.filter((file: Progress) => {
          if (file.name === this.uploadLocal.currentFile.name) {
            file.size = this.uploadLocal.currentFile.size;
            file.sizeFile = this.uploadLocal.currentFile.sizeFile;
            file.progress = this.uploadLocal.currentFile.progress;
            file.status = Status.UPLOADING;
          }
        });

        // emite os eventos de progresso
        this.progress.emit(this.uploadLocal.update.progress);
        this.update.emit(this.uploadLocal);
      };

      // envia o evento de término do upload
      reader.onload = () => {
        this.uploadLocal.currentFile.status = Status.DONE;

        if (this.uploadLocal.update.status !== Status.ERROR) {
          this.uploadLocal.update.status = Status.DONE;
        }

        const b64 = <Base64>{ data: reader.result, length, lengthFile, name };

        // atuliaza o upload no array
        this.uploadLocal.files.filter((file: Progress) => {
          if (file.name === this.uploadLocal.currentFile.name) {
            file.size = this.uploadLocal.currentFile.size;
            file.sizeFile = this.uploadLocal.currentFile.sizeFile;
            file.progress = this.uploadLocal.currentFile.progress;
            file.status = Status.DONE;
            file.base64 = b64;
          }
        });

        this.progress.emit(this.uploadLocal.update.progress);
        this.update.emit(this.uploadLocal);

        return resolve(b64);
      };

      // emite o evento de error
      reader.onerror = (error) => {
        this.uploadLocal.currentFile.status = Status.ERROR;
        this.uploadLocal.update.status = Status.ERROR;

        // atuliaza o upload no array
        this.uploadLocal.files.filter((file: Progress) => {
          if (file.name === this.uploadLocal.currentFile.name) {
            file.status = Status.ERROR;
          }
        });

        this.progress.emit(this.uploadLocal.update.progress);
        this.update.emit(this.uploadLocal);

        return resolve(<Base64>{});
      };
    });
  }

  /**
   * Transforma bytes em declarações de KB/MB/GB
   * @param bytes {number}
=   */
  private formatToBytes(bytes: number): string {
    const kBytes: Number = Number(Number(bytes / 1024).toFixed(2));

    if (kBytes < 1) {
      return `${bytes} Bytes`;
    }

    if (kBytes < 1000) {
      return `${kBytes} KB`;
    }

    const mBytes: Number = Number(Number(bytes / 1024 ** 2).toFixed(2));

    if (mBytes < 1000) {
      return `${mBytes} MB`;
    }

    const gBytes: Number = Number(Number(bytes / 1024 ** 3).toFixed(2));

    if (gBytes < 1000) {
      return `${gBytes} GB`;
    }

    return `0 Bytes`;
  }

  /**
   * converte para porcentagem
   * @param total {number}
   * @param acc {number}
   */
  private percent(total: number, acc: number): number {
    return Number(Number((acc / total) * 100).toFixed(2));
  }
}
