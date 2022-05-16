import child_proccess from 'child_process';

const option = {
  windowsHide: true,
}

const regedit = {
  set: (path: string, name: string, type: string, value: string) => {
    return child_proccess.execSync(`reg add "${path}" /v ${name} /t ${type} /d ${value} /f`, option);
  },

  setValue: (path: string, name: string, value: string) => {
    return child_proccess.execSync(`reg add "${path}" /v ${name} /d "${value}" /f`, option);
  },

  get: (path: string, name: string) => {
    return child_proccess.execSync(`reg query "${path}" /v ${name}`, option).toString().trim();
  }
}

export default regedit;