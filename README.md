# AFDA SPACE

![README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/Untitled.png](README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/Untitled.png)[logo.png]

AFDA SPACE is mental health data sharing community.

## 🔫 Purpose

Purposes of this project are as follows.

- Help patients to manage their disease history systematically.
- Give the insight about patients' mental condition based on their data.
- Provide social support by connecting each other.

## ☕ Skills

React, Node.js, MySQL, AWS(EC2, RDS, S3, CloudFront, Route53)

## 👀 Summary

This project contains following feature pages.

- Newspeed: display user's activities.
- My page: upload & manage their disease history.
- Diagnosis: display mental diagnosis' data and charts.
- Medicine: display mental medicines' data and charts.
- Station: board for sharing questions and answers about mental health.

## 🏄🏻‍♂️ Surfing a service

**Newspeed**

![README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/ezgif.com-gif-maker.gif](README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/ezgif.com-gif-maker.gif)[newspeed.gif]

People can communicate with others who suffer similar mental problems. Health data registration & normal posts are updated on newspeed.

**My page**

![README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/Untitled%201.png](README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/Untitled%201.png)[my-page.png]

User can manage & track their disease history, based on diagnosis & symptom & medicine.

- About diagnosis, following data are collected: first (symptom) noticing date, first diagnosed date, symptoms, etc.
- About medicine, following data are collected: dosage(first taking date, dosage, medicine taken before and after), purpose, evaluation(evaluation date, effectiveness, side effects, adherence, burden, unexpected positive effects, tips, cost), etc.

Data above are processed as statistical input. Then statistics collection give insight as a form of chart & graph.

**Diagnosis**

![README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/Untitled%202.png](README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/Untitled%202.png)[diagnosis.png]

We can see many diagnoses, sorted in descending order by the person who suffer each diagnosis. Each blue diagnosis name is linked to detail page.

![README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/diagnosis_summary.gif](README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/diagnosis_summary.gif)[diagnosis-summary.gif]

There are many information about the diagnosis, which give us some insight. **Figures shown on graph & chart are based on data submitted by AFDA SPACE users.** This page here shows us ages, sex, diagnostic status of the diagnosis.

![README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/Untitled%203.png](README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/Untitled%203.png)[diagnosis-symptom.png]

This page shows us what symptoms do users with this diagnosis have the most.

![README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/diagnosis_medicine.gif](README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/diagnosis_medicine.gif)[diagnosis-medicine.gif]

This page shows us top 10 prescription drugs taken by users with this diagnosis. Each bar shows degree distribution of effectiveness & side effects that user felt on the medicine.

**Medicine**

![README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/Untitled%204.png](README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/Untitled%204.png)[medicine.png]

We can see many medicines, sorted in descending order by the person who take each medicine. Each blue medicine name is linked to detail page.

![README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/medicine_summary.gif](README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/medicine_summary.gif)[medicine-summary.gif]

In detailed medicine page, we can see many insightful information. Likewise, figures shown on graph & chart are based on data submitted by AFDA SPACE users. This page offers information about purpose, perceived effectiveness, degree and types of side effects, reasons of stop taking, adherence, burden of taking, cost, taken medicine before and after this medicine.

**Station**

![README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/Untitled%205.png](README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/Untitled%205.png)[station.png]

In station page, users can share their curiosities, experiences, know-how freely.

![README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/Untitled%206.png](README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/Untitled%206.png)[station-detail.png]

Users have active discussion on each topic.

**Sign in & Sign up**

![README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/Untitled%207.png](README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/Untitled%207.png)[sign-in-up.png]

We can sign in & up through Kakao login, or just by email.

## 💻 Detailed implementation

As my own project, I was in charge of every development process: service planning, design, front-end, back-end, deployment.

**Architecture**

![README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/Untitled%208.png](README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/Untitled%208.png)[architecture.png]

- By using RDS, I could get benefits in easy database administration, snapshot(back-up) service, securing. It could be better to build database in EC2 if I need a more flexibility.
- Usage of CloudFront was explicitly over-spec, in the sense that the _AFDA SPACE_ was a service very localized in South Korea. But as free tier account, it could be just one of interesting options. And one more thing - with CloudFront, we can apply HTTPS easily.

**Web framework**

It uses Express for a Node.js web framework.

**Database schema**

![README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/Untitled%209.png](README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/Untitled%209.png)[schema.png]

All schemas satisfy 1NF, 2NF, 3NF, BCNF of database normalization.

One controversial point. Unlike pattern between schema `diagnoses` - `diagnosisData` and `symptoms` - `symptomData`, schema `medicines` has another pattern with a lot of data-related schemas : `medicineData`, `medicineSideEffectsData`, `medicinePurposeData`, `medicineEvaluationData`, `medicineDosageData`.

There was another easy-to-think option: constructing all columns in 1 schema `medicineData` like other schema(`diagnosisData`, `symptomData`). But for the following reasons, I thought current design would be more desirable.

- In logical sense: Columns are clearly divided well based on its category(side effect, purpose, evaluation, dosage).
- Scalability: It's scenario not applied to current version, but there may be following situation that 1 user registers multiple data on the same medicine. And the timing of each data's category could not be consistent. For example, in case of `medicinePurposeData` and `medicineSideEffectsData`, there would be happen to appear another side effect on the same medicine and the same purpose, under the influence of changing other taking medicines. Easy-to-think option can't response to the situation.
- If there are too many columns in schema, there could be performance issues on reading & writing because of increasement of disk I/O. If all columns are got together, there are total 45 columns.

**Authentication**

It uses JWT as authentication token. It utilizes information in JWT token for displaying user information or authorizing the user.

```jsx
/* join.js */
// ...
const token = jwt.sign(
  {
    id: user.id,
    userType: user.userType,
    nick: user.profile.nick,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "12h",
    issuer: "아프다스페이스.com",
  }
);

/* checkJWT.js */
// ...
jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
  if (err) next(CustomError("Unauthorized", "Not verified jwt"));
  else {
    return res.status(200).json({ logged: true, id: decoded.id });
  }
});
```

Using JWT gives the following advantages.

- Security: JWT guarantees integrity & validity by signature.
- Scalability: Client and server are independent.
- Less memory to maintain data about users compared to session.

On the other hand, there are some cons.

- More traffic: Token is attached in almost every requests, leading more traffic.
- Token hijacking: Stolen token could be abused by someone.

**ORM**

It uses Sequelize.js for Node.js based ORM which supports MySQL.

**API architecture**

It is designed while following REST API architecture.

- URI represents resource of data.  
  `GET /api/user/:id/diagnosis`
- Behavior on resources is represented by HTTP method.  
  `POST /api/station/:id/comment`
- It responses with status code along with its proper meaning.  
  `400 on client's inappropriate request`  
  `401 on unauthorized access`  
  `404 on not found`  
  `500 on internal server error`

However, according to strict constraints of REST prescribed by Roy Fielding, it doesn't follow the rule "_uniform interface_". Other rules are automatically followed because API are built on HTTP protocol.

Among components of _uniform interface_, it doesn't obey the following points.

- Self-descriptive messages
- Hypermedia As The Engine Of Application State (HATEOAS)

In the sense, maybe I sholud call it just "HTTP API".

**Business logic**

![README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/Untitled%2010.png](README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/Untitled%2010.png)[business-logic-example.png]

The main business logics of _AFDA SPACE_ are gathered around "chart".

`AFDA_SPACE/back_end/routes/chart/showMedicineSummary.js`  
`AFDA_SPACE/back_end/routes/chart/showDiagnosisSummary.js`  
`AFDA_SPACE/back_end/routes/chart/showDiagnosisMedicine.js`  
`...`

**Data pipeline**

![README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/Untitled%2011.png](README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/Untitled%2011.png)[data-pipeline.png]

It gathers user's health data and processes them as the forms of chart, which give us unexpected insight.

**User interface library & state container**

It uses React & Redux. The project is based on create-react-app.

**Reducer bundles**

It uses [Ducks](https://github.com/erikras/ducks-modular-redux) as reducer bundles pattern. It helps to make modules self-contained and isolated, and easy to manage.

```jsx
/* store/modules/content.js */
import { createAction, handleActions } from "redux-actions";
import { pender } from "redux-pender";
// ...

/* Action Types */
const GET_DIAGNOSIS_LIST = "content/GET_DIAGNOSIS_LIST";
const GET_SYMPTOM_LIST = "content/GET_SYMPTOM_LIST";
const GET_MEDICINE_LIST = "content/GET_MEDICINE_LIST";
// ...

/* Action Creators */
export const getDiagnosisList = createAction(
  GET_DIAGNOSIS_LIST,
  api.getDiagnosisList
);
export const getSymptomList = createAction(
  GET_SYMPTOM_LIST,
  api.getSymptomList
);
export const getMedicineList = createAction(
  GET_MEDICINE_LIST,
  api.getMedicineList
);
// ...

/* Initial State */
const initialState = Map({
  diagnosisList: List(),
  symptomList: List(),
  medicineList: List(),
  // ...
});

/* Reducer */
export default handleActions({
  ...pender({
    type: GET_DIAGNOSIS_LIST,
    onSuccess: (state, action) => {
      const { contentList } = action.payload.data;
      return state.set("diagnosisList", fromJS(contentList));
    },
  }),
  // ...
});
```

As seen above, it uses package `'redux-actions'` : `createAction` for easy authmation of creating actions & `handleActions` for coping with scope issues on `switch`-`case` statements.

Package `'redux-pender'` is middleware that helps us to manage asynchronous actions based on `Promise`. It acts almost like `'redux-promise-middleware'`, except that `'redux-pender'` provides more handy utils. It reduces complexity of reducers and increase readability.

**Immutable data structure**

It uses immutable.js as immutable data structure library.

**Component pattern**

It follows [Container and Presentational components](https://medium.com/@learnreact/container-components-c0e67432e005) pattern.

```
...
├──src
│   ├─components
... │     ├─contents
    │     │    ├─ContentList
    │     ...  ├─Description
    │          ...
    │
    ├─containers
    │     ├─contents
    ...   │    ├─ContentListContainer
          ...  ├─DescriptionContainer
               ...
```

Presentational components are concerned with how things look. Container components are concerned with how things work. This pattern helps us to make better seperation of concerns.

(As a retrospective from 2021) But, [as Dan Abramov said](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0), this pattern could be no more useful due to the hooks. Hooks let us do the same thing this pattern is trying to do more easily.

**Chart**

It uses [TOAST UI Chart for React](https://github.com/nhn/toast-ui.react-chart).

**CSS preprocessor**

It uses Sass as CSS preprocessor.

## Updates

**2021.03.05. Server caching**

When it comes to performance improvement, 'caching chart data' was one of the most appropriate item - for the following reasons.

- Chart pages were the main killing contents, so they were viewed very frequently.
- Chart data were not changed(updated) frequently.
- Processing chart data was heavy, repetitive work but with almost the same result.

I implemented a cache with doubly linked list and hash map, [LRU](<https://en.wikipedia.org/wiki/Cache_replacement_policies#Least_recently_used_(LRU)>) as replacement algorithm, using Javascript class.

- Doubly linked list helps to provide O(1) for addition, deletion, order change of new data.
- Hash map helps to provide O(1) for searching existing data in linked list.

(See detail code at `AFDASPACE/back_end/middleware/implementation/Cache.js`)

As result of improvement, according to tests using Apache Bench, `requests per second` are improved from `27.80` to `414.69` and `time per request` from `719.307ms` to `48.229ms`.

![README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/performance.png](README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/performance.png)[performance_comparison.png]

## 🌈 etc.

**Web design**

![README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/Untitled%2012.png](README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/Untitled%2012.png)[logo-design.png]

Usage of golden ratio on AFDA SPACE logo.

![README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/Untitled%2013.png](README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/Untitled%2013.png)[web-design.png]

I designed web UI with Adobe XD.

## 📜 License

_AFDA SPACE_ is under the MIT license.
