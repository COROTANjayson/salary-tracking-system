import * as jose from 'jose'

export const encrypt = async(payload) => {
    // const Private = new TextEncoder().encode( 'private-key');
    const SECRET_KEY = "ThWmZq4t7w!z%C*F-JaNdRfUjXn2r5u8"
    const secretKey = new TextEncoder().encode(SECRET_KEY)
    const jwt = await new jose.EncryptJWT({data: payload})
    .setProtectedHeader({ alg: 'dir', enc: 'A256GCM' })
    .setIssuedAt()
    .setIssuer('urn:example:issuer')
    .setAudience('urn:example:audience')
    .setExpirationTime('2h')
    .encrypt(secretKey)

// console.log(jwt)
return jwt
}

export const verifyToken = async(authtoken) => {
  const token =authtoken.replace('Bearer ', '');
  const algorithm = 'ES256'
  const spki = `-----BEGIN PUBLIC KEY-----
  MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEFlHHWfLk0gLBbsLTcuCrbCqoHqmM
  YJepMC+Q+Dd6RBmBiA41evUsNMwLeN+PNFqib+xwi9JkJ8qhZkq8Y/IzGg==
  -----END PUBLIC KEY-----`
  const ecPublicKey = await jose.importSPKI(spki, algorithm)
  try {
    // verify token
    const { payload, protectedHeader } = await jose.jwtVerify(token, ecPublicKey, {
        issuer: 'urn:example:issuer',
        audience: 'urn:example:audience',
    });
    // log values to console
    // console.log(payload);
    // console.log(protectedHeader);
    return payload
  } catch (e) {
  // token verification failed
      console.log("Token is invalid");

      return false
  }
}      