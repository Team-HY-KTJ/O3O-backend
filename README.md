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
`res.data.userid`, `res.data.balance`로 각각 string인 `userid`, integer인 `balance`를 받을 수 있음..

## O3O-DB develop 관련
router.js에서 routerRoot폴더 하위의 폴더를 탐색하며 .js파일을 자동으로 import 진행.

그래서 app에 자동으로 추가되려면 다음 요소를 맞춰주어야 한다.

<br/>

routerRoot 폴더 내에 폴더 하나를 더 만들고 (ex. routerRoot\balance)
거기서 .js파일 작성하는데, export에 route, router가 있도록
```js
// example GETbalance.js
export { route, router };
```
route는 요청주는 경로, router는 Callback 함수

```js
// example
app.get(route, router)
router.get(route, router)
```
