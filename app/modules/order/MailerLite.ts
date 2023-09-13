import MailerLite from '@mailerlite/mailerlite-nodejs';

export interface CreateOrUpdateParams {
  email: string;
  fields?: object;
  groups?: Array<string>;
  status?: 'active' | 'unsubscribed' | 'unconfirmed' | 'bounced' | 'junk';
}

const mailerlite = new MailerLite({
  api_key:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiNWVjY2M2Yjg1MjJkNTIzYWM1YmVmYjBkNDYxZGIxOGRhMjZmNzhkYzBmOGYwN2Q3MWVlODIwN2UwODkyMjhhZWQyNDNlMmViMjlhY2NjMDkiLCJpYXQiOjE2OTM4MDI1MjMuOTE5MTc3LCJuYmYiOjE2OTM4MDI1MjMuOTE5MTgxLCJleHAiOjQ4NDk0NzYxMjMuOTE0MDIsInN1YiI6IjYwOTUzOCIsInNjb3BlcyI6W119.C6On9TbOkSmBQLieOGbo8Mut2BAMv_YcyHWuYyABBn-eEqlm-72LdaQSuaGZYQF0PIK5E0w4plRHPC87CiWd-jFcsmV4cAO_3_9pAUQX2TBEkUsWu4T7W-pmY_1-6l94dwGVvv2uT0If_GPKLY4jsPgwmQHHSLtc-OiWueAoUQIjt649y2h44SqSxyC8uXCCOjiK-y0luo7ATaC8oNPRCB66frYLTd4WN6dmbgQv_z3mbmyzGQ6bQG9A-ctheXOVlKbl4NO9RkC5mr2k2PjBXiTDeX_61-3rg3sSBt5-Oqtv_iQ8j8F92xNM-1HanpVBmXADJcZuG7VAFzIWKzaJ8CoD9lblx1_QmdizHfF73W9N3XvoMESOBDqVgyOHB6WakBmGSxMc4sxD6FthN7YfPtk-Y9NlaLcLKuXE-oM3GgsUEGaZS1FgTZ2cgtDnk01n4a80gSJqF3LRqkK0HGIiN-vdpj_IIgUofUkCXQ7ivTDx16g6ONCsbiqrOrJwkB_rJZTMJo20xs-20sk6REjYaXF15NrQHplAPwOvy4IVQA4X8cd7r5CODIgJYBbIW5CB8bnXLGmGrWKpQ0Vo3ofhfALmL0gvROC5I_wKHl-f5Z6U4i02bVd8xeT9hhwpwjQJ8kilKXN2gkEhaLV1LymbTb8GclgUyDm8_Lsyp7Gm8zk',
});

export function usePickingUp() {
  const params: CreateOrUpdateParams = {
    email: 'bagasvanbacdim+234@gmail.com',
    fields: {
      name: 'Bagas',
      last_name: 'Achmad',
      any: 'anything you want to fill',
    },
    groups: ['98353352732051296'],
    status: 'active',
  };

  mailerlite.subscribers
    .createOrUpdate(params)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      if (error.response) console.log(error.response.data);
    });
}
