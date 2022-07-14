# 主要
```text
dist/
└── style.min.css

src/
├── createTable.js
├── default.js
├── index.js
└── style.scss

```

# 依賴
- **jQuery**
- **Bootstrap**
- **lodash**

# 使用說明
## 安裝
In browser: 
```html
<script src="/assets/plugins/freeze-mini-calendar/dist/freeze-mini-calendar.min.js"></script>
```

## 用法 
### Syntax
```js
new CreateTable( options = { })
```

- **options** (optional)
  - Type: `Object`
  - 可用的 [options](#options).

## 範例
```html

<div id="userTable">
  <!-- Data List -->
  <tbody></tbody>

</div>
```

```js
const calendarContainer = document.getElementById('calendar-container');
const newTable = new CreateTable
newTable.renderTable(newTable.data)
// 資料格式範例
data = [
  {
    id: 1,
    name: 'George Maria Anderson',
    email: 'f.lhp@izxld.to',
    phone: ['0996-001371'],
    date: '2021-03-01',
  }
]
```

# Options
### data
- Type: `Array`
- Default: `  {
    id: 1,
    name: 'George Maria Anderson',
    email: 'f.lhp@izxld.to',
    phone: ['0996-001371'],
    date: '2021-03-01',
  }
`
- 傳入欄位的資料

### showPerPage
- Type: `Boolean`
- Default: `true`
- note: 是否顯示自訂筆數

### showSearch
- Type: `Boolean`
- Default: `true`
- note: 是否顯示搜尋輸入框

### showInfo
- Type: `Boolean`
- Default: `true`
- note: 是否顯示總筆數資訊    

### showPage
- Type: `Boolean`
- Default: `true`
- note: 是否顯示分頁導航

### perPage
- Type: `Number`
- Default: `5`
- note: 初始分頁數


# Methods
### refetchTable()
重新渲染 Table 

### handleData()
預設5筆資料

- **return value**
  - Type: `array`
  - Default: none

### pageTemp( _, index )
插入分頁html

### makeTemp(data,temp,str)
建立分頁功能

- **data**
  - Type: `Array`
抓取資料  

### showAllData()
渲染總筆數

### searchFunction()
執行搜尋功能


## 瀏覽器支援 
- ### Chrome (latest)
- ### Firefox (latest)
- ### Safari (latest)
- ### Opera (latest)
- ### Edge (latest)
- ### Internet Explorer 11

