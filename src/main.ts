/* eslint-disable no-useless-escape */

import { writeFileSync } from 'fs';
import { textLinkToHyperlink } from './function/index';

export async function app(text: string) {
  console.log('-------------------------END-----------------------\n', textLinkToHyperlink(text));
  const result = textLinkToHyperlink(text)
  writeFileSync('./index.html', result);
}

// const text = `Img link: https://images.pexels.com/phoAtos/326055/pexels-photoA-326055.jpeg?auto=compress&cs=tinysrgb&w=800 ùcwrrc
// https://media.gettyimages.com/id/1071104734/photo/woman-silhouette-at-sunset-on-hill.jpg?s=612x612&w=gi&k=20&c=wFk5-jWgL7HUYwvp8syXCuwR6D3xRHJOLM1VHbstdgI= ewdcf

// Img link in tag: <img src=" https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Color image" title="Color image " class="cq-dd-image"/>

// Doc link: 
// https://file-examples.com/wp-content/uploads/2017/02/file-sample_100kB.doc
// https://file-examples.com/wp-content/uploads/2017/02/xls-file-sample_100kB.docxvdvdvdvd

// Excel linl:
// https://file-examples.com/wp-content/uploads/2017/02/file_example_XLS_10.xls
// https://file-examples.com/wp-content/uploads/2017/02/file_example_XLSX_5000.xlsx
// https://github.com/SheetJS/test_files/blob/master/AutoFilter.xlsb

// Powerpoint link:
// https://scholar.harvard.edu/files/torman_personal/files/samplepptx.pptx 

// https://file-examples.com/wp-content/uploads/2017/08/file_example_PPT_250kB.ppt 

// https://file-examples.com/wp-content/uploads/2017/08/file_example_PPT_500kB.ppt

// PDF link:
// https://www.africau.edu/images/default/sample.pdf
// https://www.clickdimensions.com/links/TestPDFfile.pdf

// Normal link: https://test-code.uni-voice.biz/projects/search

// Sample of <mark class=\"cdx-marker\">highlight 09090909090909</mark>09090909090909 <a href=\"https://sk-global.biz\">link </a> <a href=\"tel:090909009090\">phone  0934123456 </a>,
// ０９８８８４７０２１０ <a href=\"https://www.google.co.jp/maps/place/74-truong-quoc-dung\">map ０９８８８４７０２１</a> ０９８８８４７０２１
// ０９８８８４７０２１０
// ０１１２７１ー６６７７
// ９４２５ー４２２ー５２５３４９
// ８６ー４２２ー５２５３４９
// ７２４ー４２２ー５２５３４９
// ０３ー４２２ー５２５３４９
// ＋８１３ー４２２ー５２５３４９
// 0909090909090909090909090

// email@example.com
// firstname.lastname@example.com
// email@subdomain.example.com
// firstname+lastname@example.com
// email@123.123.123.123
// email@[123.123.123.123]
// "email"@example.com
// 1234567890@example.com
// email@example-one.com
// _______@example.com
// email@example.name
// email@example.museum
// email@example.co.jp
// firstname-lastname@example.com

// 日本の住所のサンプル愛知県    〒460-8501 名古屋市中区三の丸三丁目1番2号日本の住所のサンプル三重県    〒514-8570 津市広明町13番地滋賀県    〒520-8577 大津市京町四丁目1番1号 京都府    〒602-8570 京都市上京区下立売通新町西入薮ノ内町 
// 大阪府    〒540-8570 大阪市中央区大手前2丁目`;

const text=`<tr tabindex=\"0\" aria-label=\"０９８８８４７０２１０ 2行目、所在地、東大阪市西岩田3-4-5、\n東大阪市横枕1-31\n\n、\n東大阪市若草町1-6\n\n、八尾市龍華町1-3-1、\"></tr>
`
app(text);
