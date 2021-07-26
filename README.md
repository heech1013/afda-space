# AFDA SPACE

![README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/Untitled.png](README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/Untitled.png)

`아프다 스페이스`는 **헬스 데이터**를 공유할 수 있는 **커뮤니티** 서비스입니다.

---

## UPDATE: 리팩토링

(2021.07 ~ 진행 중)

- update promises process in parallel
- eliminate useless promises
  - `commit 5d50e5`
  - `commit 050592`

## 진행 기간

![README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/schedule.png](README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/schedule.png)

## 담당 역할

- 서비스 기획
- 디자인
- 클라이언트 / 서버 구축
- 배포

## 기술 스택

- front-end: **HTML/CSS**, **JavaScript**, **React**
- back-end: **Node.js**, **MySQL**
- dev-ops: **AWS**

## 배포

![README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/Untitled%208.png](README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/Untitled%208.png)

## DB 스키마

![README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/Untitled%209.png](README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/Untitled%209.png)

## 서비스의 목적

- 자신의 **질환**에 대해 **체계적으로 관리**할 수 있습니다.
- **구조화된 문항**을 통해 개개인의 주관적인 경험으로부터 **객관적 데이터**를 추출합니다. 이를 통해 각 질환별로 **의미 있는 데이터**를 도출해냅니다.
- 자신과 **같은 질환**을 겪고 있는 사람들 간 교류할 수 있는 **커뮤니티**를 제공합니다.

## 서비스의 구성

- **뉴스피드**: 유저가 작성한 글 및 활동 내역을 보여줍니다.
- **마이 페이지**: 자신의 질환에 대해 기록할 수 있습니다.
- **질환별 페이지**: 전체 유저의 데이터를 기반으로 각 질환별 평가 항목(평균 나이, 성별 등)에 대한 차트를 살펴볼 수 있습니다.
- **처방 약별 페이지**: 전체 유저의 데이터를 기반으로 각 처방 약별 평가 항목(효과, 부작용 등)에 대한 차트를 살펴볼 수 있습니다.
- **정거장(게시판)**: 특정 질환 및 처방 약과 관련된 질답과 정보를 주고받을 수 있습니다.

## 서비스 둘러보기

**뉴스피드**

![README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/ezgif.com-gif-maker.gif](README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/ezgif.com-gif-maker.gif)[newspeed.gif]

**마이 페이지**

![README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/Untitled%201.png](README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/Untitled%201.png)

- 유저는 자신의 질환, 처방 약, 증상에 대한 기록을 관리할 수 있습니다.
- 유저로부터 수집된 정보는 통계적으로 가공되어 차트의 형태로 제공됩니다.
- 질환에 대해 다음 항목을 수집합니다.
  - 처음으로 관련 증상을 알아차린 날짜, 처음으로 해당 질환을 진단받은 날짜, 관련 증상 등
- 처방 약에 대해 다음 항목을 수집합니다.
  - 용량 관련: 처음으로 해당 약을 복용한 날짜, 약의 용량, 해당 약 이전/이후에 복용한 약
  - 평가 관련: 평가 날짜, 인지되는 효과, 부작용, 약을 복용하는 것에 느끼는 신체적 부담감, 의도치 않은 긍정적 효과, 비용, 팁 등
  - 약을 처방 받는 목적

**질환별 페이지**

![README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/Untitled%202.png](README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/Untitled%202.png)

- 각 질환 카테고리가 해당 질환을 겪고 있는 유저의 수를 기반으로 정렬되어 있습니다.

![README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/diagnosis_summary.gif](README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/diagnosis_summary.gif)[diagnosis-summary.gif]

- 질환을 겪고 있는 유저의 평균 데이터를 다음 항목에 대해 차트로 보여줍니다.
  - 나이 / 성별 / 진단 여부

![README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/Untitled%203.png](README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/Untitled%203.png)

- 각 질환을 겪고 있는 유저에 대해, 특정 증상이 나타나는 빈도를 기준으로 정렬되어 있습니다.

![README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/diagnosis_medicine.gif](README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/diagnosis_medicine.gif)[diagnosis-medicine.gif]

- 각 질환을 겪고 있는 유저에 대해, 상위 10개의 가장 많이 처방되는 약을 보여줍니다.
- 차트는 각 처방 약의 효과, 부작용을 나타내는 두 개의 바(bar)로 구성되어 있습니다.
- 각 바(bar)는 평가 항목에 따라 색의 진한 정도로 구분되어 있습니다.

**처방 약별 페이지**

![README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/Untitled%204.png](README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/Untitled%204.png)

- 각 처방 약 카테고리가 해당 약을 복용하고 있는 유저의 수를 기반으로 정렬되어 있습니다.

![README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/medicine_summary.gif](README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/medicine_summary.gif)[medicine-summary.gif]

- 해당 약을 복용 중인 유저의 평균 데이터를 다음 항목에 대해 차트로 보여줍니다.
  - 약을 복용하는 목적 / 인지되는 효과 / 부작용의 종류와 심각성 / 복용을 그만둔 이유 / 약을 복용하는 데 느끼는 신체적 부담감 / 비용 / 해당 약을 복용하기 이전/이후에 복용한 약 등

**정거장(게시판)**

![README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/Untitled%205.png](README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/Untitled%205.png)

![README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/Untitled%206.png](README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/Untitled%206.png)

- 특정 질환 및 처방 약과 관련된 질답과 정보를 주고받을 수 있습니다.

**로그인/회원가입**

![README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/Untitled%207.png](README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/Untitled%207.png)

- 이메일 또는 카카오 계정으로 서비스를 사용할 수 있습니다.

## 디자인

**로고 디자인**

![README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/Untitled%2012.png](README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/Untitled%2012.png)

**웹 디자인**

![README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/Untitled%2013.png](README%20md%20-%20AFDA%20SPACE%2080a0740178ef4db49f6859bc26cc9317/Untitled%2013.png)

- tool: Adobe XD
