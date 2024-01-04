# AI 안면인식과 블록체인을 활용한 자동화 범죄자 추적 기술

# :books: 목차

- [:book: 프로젝트 소개](#book-프로젝트-소개)

  - [프로젝트 개요](#프로젝트-개요)
  - [프로젝트 요약](#프로젝트-요약)
  - [프로젝트 플로우차트](#프로젝트-플로우차트)
  <!-- - [DB 스키마](#db-스키마) -->

- [:wrench: 사용 기술 (Technique)](#wrench-사용-기술-technique)

  - [:hammer:기술 스택 (Technique Used)](#기술-스택-technique-used)

    - [**FrontEnd**](#frontend)
    - [**BackEnd**](#backend)
    - [**Smart Contract**](#smart-contract)
    <!-- - [**Deploy**](#deploy) -->

    <!-- - [Deploy :rocket:](#deploy-rocket) -->
    <!-- - [Connect](#connect) -->

- [:computer: 제공 기능 (Service)](#computer-제공-기능-service)

# :book: 프로젝트 소개

## 프로젝트 개요

국제 공조는 국제화에 따라서 초국가적 범죄, 범죄자의 해외 도피, 범죄 수익의 해외 유출이 급격하게 증가함에 따라 중요성이 강조되고 있다.
국제 공조에 있어서 기존 수사기관의 신상정보 공유 방식과는 다르게 자동화된 방식을 사용한 프로젝트이다.
블록체인 기술의 스마트 컨트랙트 코드와 안면 유사도 비교 알고리즘을 사용하여 실시간으로 안면 검출 및 인식을 통해 특징 벡터를 추출하고
블록체인에 사전에 등록해 놓은 범죄자 신원 데이터를 호출한다. 범죄자 데이터에서 얻은 범죄자 안면 특징 벡터와 추출한 특징 벡터를 유클리드 거리 계산을 통해 유사도를 비교하여
범죄자 일치여부를 확인하고 범죄 내역과 스마트 컨트랙트를 통해 적색수배 여부를 결정한다.
범죄자 신상정보의 투명성 및 무결성을 보장할 수 있으며 자동화 추적 기술을 통해 범죄 수사의 높은 효율을 기대할 수 있다.

## 프로젝트 요약

이 프로젝트는 블록체인과 안면 인식 기술을 이용하여 범죄자의 특징을 추출하고,사전에 등록된 데이터와 비교하여 범죄자를 확인하는 자동화된 시스템입니다.

이를 통해 범죄자 신상정보의 투명성과 무결성을 제고하며, 스마트 컨트랙트를 활용하여 적색수배 여부를 결정합니다.

## 프로젝트 플로우차트

![](./Doc/img/flowchart.png)

# :wrench: 사용 기술 (Technique)

![](./Doc/img/tech.png)

### FrontEnd

|                         Icon                         | Stack | Description     |
| :--------------------------------------------------: | :---: | --------------- |
| <img src = "/Doc/stackIcon/react.png" height = 25px> | REACT | 프론트앤드 구성 |

### BackEnd

|                         Icon                          | Stack  | Description   |
| :---------------------------------------------------: | :----: | ------------- |
| <img src = "/Doc/stackIcon/spring.png" height = 25px> | SPRING | API 서버 제작 |

### Smart Contract

|                          Icon                           |  Stack   | Description          |
| :-----------------------------------------------------: | :------: | -------------------- |
| <img src = "/Doc/stackIcon/Solidity.png" height = 25px> | SOLIDITY | 스마트 컨트랙트 작성 |
| <img src = "/Doc/stackIcon/Truffle.png" height = 25px>  | TRUFFLE  | 스마트 컨트랙트 배포 |
| <img src = "/Doc/stackIcon/ethlogo.png" height = 25px>  | ETHEREUM | 블록체인 네트워크    |
| <img src = "/Doc/stackIcon/ganache.png" height = 25px>  | GANACHE  | 로컬에서 테스트      |

<!-- ### Deploy

|                               Icon                                |        Stack        | Description                        |
| :---------------------------------------------------------------: | :-----------------: | ---------------------------------- |
|    <img src = "./Doc/img/stackIcon/docker.png" height = 25px>     |       DOCKER        | 컨테이너 생성, 배포 시 이미지 생성 |
|      <img src = "./Doc/img/stackIcon/ec2.png" height = 30px>      |         EC2         | 배포 서버                          |
|    <img src = "./Doc/img/stackIcon/route53.png" height = 30px>    |      ROUTE 53       | DNS와 EC2서버 연결                 |
|      <img src = "./Doc/img/stackIcon/acm.png" height = 30px>      | CERTIFICATE MANAGER | SSL 인증서 생성                    |
| <img src = "./Doc/img/stackIcon/githubactions.png" height = 25px> |   GITHUB ACTIONS    | CI/CI 배포 자동화 사용             | -->

<!-- ## :construction:Architecture

## 1. FE .env 설정 -->

# :computer: 제공 기능 (Service)

## 홈화면

<div >
<!-- 홈화면 이미지 -->
<img src="/Doc/img/home.png" alt="홈화면" width="324" height="707">
<img src="/Doc/sit/fistsit.png" alt="정보입력" width="324" height="707">
</div>

범죄자의 신상정보를 입력한다. 사진 이름 국가 나이 범죄명 자산 등의 정보를 입력해야한다.

안면 정보가 추출되고 입력정보에 따라서 적색수배 발령 여부가 결정된다.

<div align="center">
<!-- 트랜잭션 이미지 -->
<img src="/Doc/sit/secondsit.png" alt="트랜잭션발생" width="324" height="707">

두 번의 트랜잭션이 발생한다.

범죄자의 정보를 기록하는 트랜잭션이 처음에 발생한 뒤적색수배 여부를 판다하는 트랜잭션이 진행되는 모습이다.

</div>

<div >

<img src="/Doc/img/facial.png" alt="얼굴인식" width="324" height="707">
<img src="/Doc/img/similarity.png" alt="얼굴인식" width="324" height="707">
1.화면에 비친 사람의 얼굴이 실시간으로 블록체인에 기록된 범죄자의 안면정보와 비교된다.

2.이때 유사도값이 0에 근접할수록 기록된 정보와 일치할 확률이 매우높아서 파란색 테두리가 아닌
빨간색 테두리로 표시된다.

</div>

```solidity
// 예시 솔리디티 코드
pragma solidity ^0.8.0;

```
