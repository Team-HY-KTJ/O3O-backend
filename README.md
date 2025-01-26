# O3O-DB
repository for database

사용 방법 (axios 사용 예시 (아마 다른 거도 비슷하긴 할 거임))
```js
import axios from 'axios';

const port = 3001;
const url = `http://localhost:${port}`;

axios.get(url + '/balance', { params : { userid: 12345, serverid: 67890}})
    .then(res => {
        console.log(`Get 성공 : ${res.data}`);
        console.log(res.data.userid);
        console.log(res.data.balance);
    })
    .catch(err => {
        console.log(`에러 발생 : ${err}`);
    });
```
url에다가 `/balance`추가하고, parameter 전달 시 `{ params : { 변수들 } }` 이런 식으로 전달

`/balance`에서는 userid, serverid로 string으로 전달.


돌아오는 값은 json으로 오며, `res.data`로 받을 수 있음.
`res.data.userid`, `res.data.balance`로 각각 string인 `userid`, integer인 `balance`를 받을 수 있음.
