(window.webpackJsonp=window.webpackJsonp||[]).push([[74],{423:function(t,v,_){"use strict";_.r(v);var i=_(14),a=Object(i.a)({},(function(){var t=this,v=t._self._c;return v("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[v("h2",{attrs:{id:"简介"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#简介"}},[t._v("#")]),t._v(" 简介")]),t._v(" "),v("p",[t._v("定位(position)是一种更加高级的布局手段，通过定位可以将元素摆放到页面的任意位置。使用 position 属性来设置定位，可选值有：")]),t._v(" "),v("ul",[v("li",[t._v("static 默认值，元素是静止的没有开启定位")]),t._v(" "),v("li",[t._v("relative 开启元素的相对定位")]),t._v(" "),v("li",[t._v("absolute 开启元素的绝对定位")]),t._v(" "),v("li",[t._v("fixed 开启元素的固定定位")]),t._v(" "),v("li",[t._v("sticky 开启元素的粘滞定位")])]),t._v(" "),v("h2",{attrs:{id:"偏移量-offset"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#偏移量-offset"}},[t._v("#")]),t._v(" 偏移量(offset)")]),t._v(" "),v("p",[t._v("当元素开启了定位以后，可以通过偏移量来设置元素的位置。")]),t._v(" "),v("ul",[v("li",[t._v("top 定位元素和定位位置上边的距离")]),t._v(" "),v("li",[t._v("bottom 定位元素和定位位置下边的距离")])]),t._v(" "),v("blockquote",[v("p",[t._v("定位元素垂直方向的位置由top和bottom两个属性来控制，通常情况下我们只会使用其中一个。tom值越大，定位元素越往下移动；bottom值越大，定位元素越向上移动。")])]),t._v(" "),v("ul",[v("li",[t._v("left 定位元素和定位位置的左侧距离")]),t._v(" "),v("li",[t._v("right 定位元素和定位位置的右侧距离")])]),t._v(" "),v("blockquote",[v("p",[t._v("定位元素水平方向的位置由left和right两个属性控制，通常也只会用一个。left越大越靠右；right越大越靠左。")])]),t._v(" "),v("h2",{attrs:{id:"相对定位"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#相对定位"}},[t._v("#")]),t._v(" 相对定位")]),t._v(" "),v("ul",[v("li",[t._v("元素开启相对定位以后，如果不设置偏移量，元素不会发生任何变化。")]),t._v(" "),v("li",[t._v("相对定位是参照元素在文档流中的位置进行定位的。")]),t._v(" "),v("li",[t._v("相对定位会提升元素的层级。")]),t._v(" "),v("li",[t._v("相对定位不会使元素脱离文档流。")]),t._v(" "),v("li",[t._v("相对定位不会改变元素的性质，块还是块，行内还是行内。")])]),t._v(" "),v("h2",{attrs:{id:"绝对定位"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#绝对定位"}},[t._v("#")]),t._v(" 绝对定位")]),t._v(" "),v("ul",[v("li",[t._v("开启绝对定位后，如果不设置偏移量，元素不会发生任何变化。")]),t._v(" "),v("li",[t._v("绝对定位元素是相对于其包含块(containing block)进行定位的。\n"),v("ul",[v("li",[t._v("正常情况下，包含块就是里当前元素最近的祖先块元素。")]),t._v(" "),v("li",[t._v("绝对定位的包含块就是离它最近的开启了定位的祖先元素，如果所有的祖先元素都没有开启定位则根元素就是它的包含块。")])])]),t._v(" "),v("li",[t._v("会使元素提升一个层级。")]),t._v(" "),v("li",[t._v("会从文档流中脱离。")]),t._v(" "),v("li",[t._v("会改变元素性质，行内变成块，块的高度被内容撑开。")])]),t._v(" "),v("h2",{attrs:{id:"固定定位"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#固定定位"}},[t._v("#")]),t._v(" 固定定位")]),t._v(" "),v("p",[t._v("固定定位也是一种绝对定位，所以固定定位的大部分特点都和绝对定位一样。唯一不同的是固定定位永远参照浏览器的视窗进行定位，固定定位的元素不会随网页的滚动条滚动。")]),t._v(" "),v("h2",{attrs:{id:"粘滞定位"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#粘滞定位"}},[t._v("#")]),t._v(" 粘滞定位")]),t._v(" "),v("p",[t._v("粘滞定位和相对定位的特点基本一致，不同的是粘滞定位可以在元素到达某个位置时将其固定。")]),t._v(" "),v("h2",{attrs:{id:"绝对定位元素的布局"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#绝对定位元素的布局"}},[t._v("#")]),t._v(" 绝对定位元素的布局")]),t._v(" "),v("p",[v("strong",[t._v("left + margin-left + border-left + padding-left + width + padding-right + border-right + margin-right + right = 包含块的内容区的宽度")])]),t._v(" "),v("p",[t._v("当我们开启绝对定位后，水平方向的布局等式需要添加 left 和 right 两个值，此时规则和之前一样，只是多添加了两个值。当发生过度约束时，如果9个值中没有auto，则自动调整right的值以使等式满足。可以设置为auto的属性有：margin、width、left、right。")]),t._v(" "),v("p",[t._v("因为left和right的值默认都是auto，所以如果不指定left和right，则等式不满足时，会自动调整这两个值。")]),t._v(" "),v("p",[t._v("垂直方向布局的等式也必须要满足："),v("strong",[t._v("top + margin-top/bottom + padding-top/bottom + border-top/bottom + height = 包含块的高度")])]),t._v(" "),v("h2",{attrs:{id:"元素的层级"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#元素的层级"}},[t._v("#")]),t._v(" 元素的层级")]),t._v(" "),v("p",[t._v("对于开启了定位元素，可以通过z-index属性来指定元素的层级。z-index需要一个整数作为参数，值越大元素的层级越高，元素的层级越高越优先显示。如果元素的层级一样，则优先显示靠下的元素。祖先的元素的层级再高也不会盖住后代元素。")])])}),[],!1,null,null,null);v.default=a.exports}}]);