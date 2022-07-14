import CreateTable from "../src/createTable.js";

// 宣告
const $element = document.querySelector( "#pageCntr" );
const $elemPage = document.querySelector( "#page" );
const $addBtn = document.querySelector( "#saveNew" );
const $elemTable = document.querySelector( "#userTable" );
const $dropDown = document.querySelector( ".toolBar__rightBar__dropdown" );

// 實例化 CreateTable class
const newTable = new CreateTable();

newTable.refetchTable( newTable.data );
newTable.showAllData();

/**
 * 下拉選單換頁
 */
if ( newTable.showPerPage === true ) {
  $element.addEventListener( "change", function () {
    newTable.limitInt = this.value;
    newTable.finalData = newTable.handleData( newTable.limitInt );
    newTable.currPage = 0;
    newTable.refetchTable( newTable.finalData[newTable.currPage] );
    newTable.renderPage();
  } )
} else {
  $dropDown.style.display = "none"
}

/**
 * 執行換頁動作
 * @param {object} e - 事件物件
 * @returns 
 */

$elemPage.addEventListener( "click", function ( e ) {
  const elemTarget = e.target;
  //=== 判斷換頁的執行 ===
  if ( elemTarget.nodeName !== "LI" ) return
  
  const clickPage = parseInt( elemTarget.dataset.page, 10 );
  $elemPage.children[newTable.currPage + 2].classList.remove( "page__item--clicked" )
  if ( clickPage === -1 ) {
    if ( newTable.currPage === 0 ) {
      $elemPage.children[newTable.currPage + 2].classList.add( "page__item--clicked" )
      return
    }
    newTable.currPage -= 1
  } else if ( clickPage === newTable.finalData.length ) {
    if ( newTable.currPage === newTable.finalData.length - 1 ) {
      $elemPage.children[newTable.currPage + 2].classList.add( "page__item--clicked" )
      return
    }
    newTable.currPage += 1
  } else {
    newTable.currPage = clickPage
  }
  newTable.refetchTable( newTable.finalData[newTable.currPage] )

} )


/**
 * 執行顯示隔天的日期
 */
let newToday = new Date();
let newTomorrow = new Date( newToday );
newTomorrow.setDate( newTomorrow.getDate() + 1 );
let finalDate = newTomorrow.toISOString().slice( 0, 10 );
const $showDate = document.querySelector( ".nextDate" );
$showDate.innerHTML = `${finalDate}`

/**
 * 執行新增功能驗證後儲存
 */
$addBtn.addEventListener( "click", function () {

  let inputEnglish = document.querySelector( "#englishNameAdd" )
  let errEnglish = document.querySelector( "#errEnglish" )
  let inputEmail = document.querySelector( "#emailAdd" )
  let errEmail = document.querySelector( "#errEmail" )
  let inputPhone = document.querySelector( "#phoneAdd" )
  let errPhone = document.querySelector( "#errPhone" )
  let checkEname = false
  let checkEmail = false
  let checkPhone = false

  // === 確認欄位資料是否正確 === 
  if ( inputEnglish.value === "" ) {
    errEnglish.innerHTML = "此欄位必填"
  } else {
    checkEname = true
    errEnglish.innerHTML = ""
  }
  if ( !inputEmail.value.match( /^\w+((-\w+)|(-\w+-)|(\.\w+.)|(\.\w+))*\@[A-Za-z0-9]+([A-Za-z0-9]+)*\.[A-Za-z0-9]+$/i ) ) {
    errEmail.innerHTML = "Email格式錯誤"
  } else {
    checkEmail = true
    errEmail.innerHTML = ""
  }
  if ( !inputPhone.value.match( /^(09)[0-9]{2}\-[0-9]{6}$/ ) ) {
    errPhone.innerHTML = "手機號碼格式錯誤"
  } else {
    checkPhone = true
    errPhone.innerHTML = ""

  }
  if ( checkEname === true && checkEmail === true && checkPhone === true ) {
    errEnglish.innerHTML = ""
    errEmail.innerHTML = ""
    errPhone.innerHTML = ""

    newTable.data.push(
      {
        id: Number( `${newTable.data.length + 1}` ),
        name: `${inputEnglish.value}`,
        email: `${inputEmail.value}`,
        phone: [`${inputPhone.value}`],
        date: `${finalDate}`,
        button: `<button type="button" class="btn btn-success editModalBtn" data-toggle="modal" data-target="#editModal" data-index="${Number( `${newTable.data.length + 1}` )}">修改</button><button type="button" class="btn btn-danger deleteBtn" data-index="${Number( `${newTable.data.length + 1}` )}">刪除</button>`
      }
    )
    inputEnglish.value = "";
    inputEmail.value = "";
    inputPhone.value = "";
    newTable.finalData = newTable.handleData( newTable.limitInt );
    newTable.refetchTable( newTable.finalData[newTable.currPage] );
    newTable.renderPage.call( newTable );
    newTable.allNum.innerHTML = `總共${newTable.data.length}筆資料`
    // 關閉modal
    $( "#exampleModal" ).modal( "hide" )
  }
} )

/**
 * 執行修改功能
 */
$elemTable.addEventListener( "click", function ( e ) {
  if ( e.target.nodeName !== "BUTTON" ) return;

  if ( e.target.classList[2] === "editModalBtn" ) {
    const id = parseInt( e.target.dataset.index, 10 );
    const ids = newTable.data.map( item => item.id );
    const index = ids.findIndex( item => item === id );
    const dataValue = newTable.data[index];
    let checkIndex = e.target.dataset.index;
    let showEditEname = document.querySelector( "#englishNameEdit" );
    showEditEname.value = dataValue.name;
    let showEditEmail = document.querySelector( "#emailEdit" );
    showEditEmail.value = dataValue.email;
    let showEditPhone = document.querySelector( "#phoneEdit" );
    showEditPhone.value = dataValue.phone;
    let showEditDate = document.querySelector( ".editDate" );
    showEditDate.value = dataValue.date;

    const editNew = document.querySelector( "#editNew" );

    editNew.addEventListener( "click", function () {
      if ( checkIndex === '' ) {
        $( "#editModal" ).modal( "hide" );
        return
      }
      newTable.data[checkIndex - 1].name = showEditEname.value;
      newTable.data[checkIndex - 1].email = showEditEmail.value;
      newTable.data[checkIndex - 1].phone = showEditPhone.value;
      newTable.data[checkIndex - 1].date = showEditDate.value;
      newTable.showAllData();
      // 關閉modal
      $( "#editModal" ).modal( "hide" );
      checkIndex = '';

    } )

  } else {
    /**
     * 執行刪除功能
     */

    const id = parseInt( e.target.dataset.index, 10 );
    const ids = newTable.data.map( item => item.id );
    const index = ids.findIndex( item => item === id );
    newTable.data.splice( index, 1 );
    newTable.currPage = 0;
    newTable.showAllData();
  }
} )


