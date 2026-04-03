//Generators
export function randomDigits(length) {
  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, num => num % 10).join('');
}
export function generateApiKey(length = 20) {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  
  return Array.from(array, num => charset[num % charset.length]).join('');
}
