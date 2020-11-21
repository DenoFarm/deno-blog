export const parseBody = (body) => {
  let tempBodyValue= {};
  if(body.type==="form"){
      for (const [key, value] of body.value) {
          tempBodyValue[key] = value;
      }
  }
  body.value = tempBodyValue;
  return body;
}