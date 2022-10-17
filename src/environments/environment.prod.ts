
import * as clientSecret from '../../client.json';
import * as clientId from '../../client.json';

export const environment = {
  production: true,
  apiUrl: 'http://apicrm.loc/',//домен сервера сюда вписать
  auth: {
    clientSecret,
    clientId
  }
};