export class JsonToFormDataService {
  run(data: any): FormData {
    const formData = new FormData();
    let keysFormData = Object.keys(data);

    if (!keysFormData.length) keysFormData = Object.keys(data);

    keysFormData.forEach((key) => {
      if (Array.isArray(data[key])) {
        data[key].forEach((d: string, index: number) => {
          formData.append(`${key}[${index}]`, d);
        });
      } else if (data[key] === 'null' || data[key] === null) {
          // @ts-ignore
          // formData.append(key, null);
      } else formData.append(key, data[key]);
    });

    return formData;
  }
}