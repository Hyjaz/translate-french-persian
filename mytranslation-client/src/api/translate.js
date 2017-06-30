import axios from 'axios';
const translate = {
  getTranslatedText(e) {
    let url = 'http://your_own_ip_server_address:3001/translate?myText=' + e;
    
    return axios.get(url)
    .then(response => {return response.data})
    .catch(err => {
      return err;
    });
  }
}

const saveText = {
  saveTranslatedText(data) {
    console.log(data);
    let url = 'http://your_own_ip_server_address:3001/saveText';
    return axios.post(url, {data})
    .then(response => {console.log(response.data)})
    .catch(err => {
      return err;
    });
  }
}

const getText = {
  getAllTranslatedText() {
    let url = 'http://your_own_ip_server_address:3001/getText';
    return axios.get(url)
    .then(response => {return response.data})
    .catch(err => {
      return err;
    });
  }
}

export { translate, saveText, getText };
