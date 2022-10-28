import { Buffer } from 'buffer';

/**
 * support algorithm mapping
 */
var algorithmMap: any = {
  HS256: 'sha256',
  HS384: 'sha384',
  HS512: 'sha512',
  RS256: 'RSA-SHA256',
};

/**
 * Map algorithm to hmac or sign type, to determine which crypto function to use
 */
var typeMap: any = {
  HS256: 'hmac',
  HS384: 'hmac',
  HS512: 'hmac',
  RS256: 'sign',
};

export function decode(token: string) {
  // check token
  if (!token) {
    throw new Error('No token supplied');
  }
  // check segments
  var segments = token.split('.');
  if (segments.length !== 3) {
    throw new Error('Not enough or too many segments');
  }

  var payloadSeg = segments[1];

  var payload = JSON.parse(base64urlDecode(payloadSeg));

  return payload;
}

export function encode(
  payload: any,
  key?: string,
  algorithm?: string,
  options?: any
) {
  // Check algorithm, default is HS256
  if (!algorithm) {
    algorithm = 'HS256';
  }

  var signingMethod = algorithmMap[algorithm];
  var signingType = typeMap[algorithm];
  if (!signingMethod || !signingType) {
    throw new Error('Algorithm not supported');
  }

  // header, typ is fixed value.
  var header = { typ: 'JWT', alg: algorithm };
  if (options && options.header) {
    assignProperties(header, options.header);
  }

  // create segments, all segments should be base64 string
  var segments = [];
  segments.push(base64urlEncode(JSON.stringify(header)));
  segments.push(base64urlEncode(JSON.stringify(payload)));
  segments.push(sign(segments.join('.'), key, signingMethod, signingType));

  return segments.join('.');
}

/**
 * private util functions
 */

function assignProperties(dest: any, source: any) {
  for (var attr in source) {
    if (source.hasOwnProperty(attr)) {
      dest[attr] = source[attr];
    }
  }
}

function sign(input: any, key: any, method: any, type: any) {
  return base64urlEscape('');
}

function base64urlDecode(str: string) {
  return Buffer.from(base64urlUnescape(str), 'base64').toString();
}

function base64urlUnescape(str: string) {
  str += new Array(5 - (str.length % 4)).join('=');
  return str.replace(/\-/g, '+').replace(/_/g, '/');
}

function base64urlEncode(str: string) {
  return base64urlEscape(Buffer.from(str).toString('base64'));
}

function base64urlEscape(str: string) {
  return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}
