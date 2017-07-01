import axios from 'axios';
// Set base url
axios.defaults.baseURL = 'http://ip_where_server_is_running:3001/'

const translate = (e) => {
    let url = 'translate?myText=' + e;
    return axios.get(url)
    .then(response => {return response.data})
    .catch(err => {
      return err;
    });
  }

const saveText = (data) => {
    let url = 'saveText';
    return axios.post(url, {data})
    .then(response => {console.log(response.data)})
    .catch(err => {
      return err;
    });
  }

const getText = () => {
    let url = '/getText';
    return axios.get(url)
    .then(response => {return response.data})
    .catch(err => {
      return err;
    });
  }
export { translate, saveText, getText };
