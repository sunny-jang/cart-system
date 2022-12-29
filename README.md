# 29CM 장바구니 시스템

## 프로젝트 실행방법

하단 스크립트를 따라 

musinsa 폴더 안의 musinsa-cart 경로로 이동 후 노드 패키지들을 install 해주세요. 🙂

```bash
$ cd musinsa-cart
$ npm install
$ npm start

http://localhost:3001 에서 프로젝트가 실행됩니다.
```

‘/’ 라우터에서 바로 상품페이지로 연동이 되도록 redirect처리가 되어있기 때문에 루트 경로에서 바로 [http://localhost:3001/products](http://localhost:3001/products) 페이지로 이동됩니다.

## ROUTES

### **‘/products’ - 상품리스트 화면**
![image](https://user-images.githubusercontent.com/35230852/209989744-5a3762a0-fe1d-42fa-931b-204aebc35522.png)

### **‘/cart’ - 장바구니 화면**

![image](https://user-images.githubusercontent.com/35230852/209989766-ec46341d-a8a6-4e12-9410-423a8ebf9677.png)

**장바구니/ 상품 리스트가 없을 때**

![image](https://user-images.githubusercontent.com/35230852/209989828-d6b4d18f-ad39-4047-8265-c7abfab0e375.png)
![image](https://user-images.githubusercontent.com/35230852/209989853-79300b24-a67e-4d8a-a080-48043510d181.png)

**아래는요구사항에는 없지만 사용성을 위해 추가로 작업되었습니다.** 

### 요구사항 이외의 추가 작업사항

- 가격 계산기에서 **할인율을 눈으로 확인 할 수 있도록** 할인 가격 노출 (색상 강조 처리)
    - 얼마나 더 저렴하게 구매하는지 노출하는 것이 구매에 도움
- 각 상품 리스트에 **할인가능여부 노출**
    - 유저들이 할인적용 여부를 미리 볼 수 있어서 편리함
- 장바구니에 담김 상품이 없을 시 **상품목록으로 유도하는 네비게이션 추가**
    - 장바구니에 담은 상품이 없습니다! > 상품 구경하기 버튼으로 구매 유도
- 상품리스트 가장 하단에 장바구니 이동 네비게이션 추가
    - 상품을 고르다가 **장바구니로 이동할 수 있도록 인터페이스 제공**
- 선택하지 않은 장바구니 아이템 갯수 설정 버튼 비활성화
    - 갯수만 선택하고 담지 않는 상황을 방지하기 위해 비활성화
