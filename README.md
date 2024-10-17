# 콘서트 예약 서비스

## 1. 요약

콘서트 예약 서비스는 유저가 대기열에 등록하면 대기 순서와 정보를 포함한 토큰을 발급받아야 하며, 예약 가능한 날짜와 좌석을 조회할 수 있습니다. 특정 날짜와 좌석을 선택해 예약 요청을 하면 좌석이 일정 시간 동안 임시로 배정되며, 유저는 미리 충전한 잔액을 통해 결제를 완료해야 좌석 소유권을 얻을 수 있습니다. 또한, 잔액 충전 및 조회 기능과 결제 후 좌석 배정을 포함한 전체 흐름은 대기열 및 동시성 문제를 고려해 처리됩니다.

## 2. 기술 스택

- NestJS, Prisma, postgresql, Typescript

## 3. MileStone

![image](https://github.com/user-attachments/assets/0e7df233-0f25-4c35-a9ce-e579dcb15d24)

## 4. 시퀀스 다이어그램

### 1. 유저 토큰 발급

![image](https://github.com/user-attachments/assets/3bc794e0-2a85-4555-80a3-4e7985c33b5f)

### 2. 예약 가능 날짜 / 좌석 조회

![image](https://github.com/user-attachments/assets/b6d64448-274e-4ac1-add6-ce3e17a589c0)

### 3. 좌석 예약 요청

![image](https://github.com/user-attachments/assets/d0f6b738-87d1-40ee-acf7-1d6ebbb16ebe)

### 4. 잔액 충전 / 조회

![image](https://github.com/user-attachments/assets/8b7b19c1-4c1b-4742-af0c-2f508b348c0d)

### 5. 결제

![image](https://github.com/user-attachments/assets/26837ab0-9a80-41fe-a68f-b9f5014debe9)

## 5. 플로우 차트

![image](https://github.com/user-attachments/assets/960052ea-a40b-4ac6-9ded-62f2e8b9f735)
![image](https://github.com/user-attachments/assets/0d3993b4-05a3-41c0-bb33-bce39f583ad2)

# concert-reservation-system

## 6. ERD

![image](https://github.com/user-attachments/assets/8c5aedeb-ba58-44a1-af3c-dc7d95dcb337)

## 7. API 명세

## 8. 패키지 구조
