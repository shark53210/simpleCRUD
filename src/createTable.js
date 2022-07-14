import DEFAULT from './default.js';
class CreateTable {
  constructor( options = {} ) {
    this.currPage = 0;
    this.finalData = [];
    this.elemPage = document.querySelector( "#page" );
    this.allNum = document.querySelector( "#showNum" );
    this.options = Object.assign(
      {},
      DEFAULT,
      _.isPlainObject( options ) && options
    );
    this.data = this.options.data;
    this.limitInt = this.options.perPage;
    this.showPerPage = this.options.showPerPage;
    this.showInfo = this.options.showInfo;
    this.showPage = this.options.showPage;
  }
  /**
   * 重新渲染 Table 
   * @param {Array} feedbackData 欄位資料
   */
  refetchTable ( feedbackData = [] ) {
    if ( !( feedbackData && feedbackData.length ) ) return;

    let $element = $( '#userTable>tbody' );

    $element.empty();

    $.each( feedbackData, function ( key, item ) {
      var row = $( '<tr></tr>' );
      row.append( $( '<td data-th="English Name" class="getEname"></td>' ).html( item.name ) );
      row.append( $( '<td data-th="Email" class="getEmail"></td>' ).html( item.email ) );
      row.append( $( '<td data-th="Phone" class="getPhone"></td>' ).html( item.phone ) );
      row.append( $( '<td data-th="Date" class="getDate"></td>' ).html( item.date ) );
      row.append( $( '<td data-th="Functions"></td>' ).html( item.button ) );

      $element.append( row );
    } );
    this.searchFunction();
    this.renderPage();
  }
  /**
   * 預設5筆資料
   * @param {number} num -資料筆數
   * @param {Array} arr - 空陣列
   * @returns {Array}
   */

  handleData ( num = 5, arr = [] ) {
    // === 判斷有多少資料 ===
    for ( let i = 0; i < this.data.length; i+=1 ) {
      if ( i % num === 0 ) {
        arr.push( [] )
      }
      arr[Math.floor( i / num )].push( this.data[i] )
    }
    return arr
  }
  /**
   * 插入分頁html
   * 
   * @param {object} _ - 用不到的參數
   * @param {object} index - 接收的索引值
   * @returns {string}
   */

  pageTemp ( _, index ) {
    return ` <li class="page-item page-link" data-page=${index}>${index + 1}</li>`
  }
  /**
   * 建立分頁功能
   * @param {Array} data - 渲染所需的資料
   * @param {function} temp - 模板
   * @param {string} str - 存放整理完模板的集合
   * @returns {string}
   */
  makeTemp ( data = this.finalData, temp = this.pageTemp, str = "" ) {
    data.forEach( ( item, index ) => {
      str += temp( item, index )
    } )
    return str
  }
  /**
   * 將分頁渲染到頁面
   */
  renderPage () {
    if ( this.showPage === true ) {
      const len = this.finalData.length;
      const defTemp = `<li class="page-item page-link" data-page="0">
      &laquo;
      </li>
      <li class="page-item page-link" data-page= "-1" >
      &lt;
    </li>
    
    `
      const lastTemp = `<li class="page-item page-link" data-page=${len}>
      &gt;
    </li>
    <li class="page-item page-link" data-page=${len - 1}>
      &raquo;
    </li>
    
    `
      this.elemPage.innerHTML = this.makeTemp( this.finalData, this.pageTemp, defTemp ) + lastTemp;
      this.elemPage.children[this.currPage + 2].classList.add( "page__item--clicked" )

    } else {
      this.elemPage.style.display = "none";
    }
  }

  /**
   * 渲染總筆數
   */
  showAllData () {
    if ( this.showInfo === true ) {
      this.finalData = this.handleData( this.limitInt );
      this.refetchTable( this.finalData[this.currPage] )
      this.renderPage()
      this.allNum.innerHTML = `總共${this.data.length}筆資料`
    } else {
      this.finalData = this.handleData( this.limitInt );
      this.refetchTable( this.finalData[this.currPage] )
      this.renderPage()
      this.allNum.style.display = "nono"
    }
  }

  /**
   * 執行搜尋功能
   */
  searchFunction () {
    if ( this.options.showSearch === true ) {
      $( ".tableFilter" ).keyup( function () {
        let value = $( this ).val();
        $( "tbody tr" ).each( function () {
          $( this ).hide();
          if ( $( this ).text().indexOf( $.trim( value ) ) >= 0 ) {
            $( this ).show();
          }
        } );
      } );
    } else {
      $( ".bar__selectBar" ).css( "display", "none" )
    }

  }

}

export default CreateTable;