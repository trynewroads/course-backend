export default () => ({
  port: parseInt(process.env.PORT ?? '3000', 10),
  defaultUser: process.env.DEFAULT_USER || 'admin',
  defaultPass: process.env.DEFAULT_PASS || '12345678',
  jwtSecret: process.env.JWT_SECRET || 'secretKey',
  enableAuth:
    process.env.ENABLE_AUTH === undefined
      ? true
      : process.env.ENABLE_AUTH === 'true',
});
