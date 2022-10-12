(window.webpackJsonp=window.webpackJsonp||[]).push([[42],{391:function(t,n,e){"use strict";e.r(n);var a=e(14),s=Object(a.a)({},(function(){var t=this,n=t._self._c;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("blockquote",[n("p",[t._v("实验15：通过注解分别创建Dao、Service、Controller★")]),t._v(" "),n("p",[t._v("实验16：使用context:include-filter指定扫描包时要包含的类")]),t._v(" "),n("p",[t._v("实验17：使用context:exclude-filter指定扫描包时不包含的类")]),t._v(" "),n("p",[t._v("实验18：使用@Autowired注解实现根据类型实现自动装配★")]),t._v(" "),n("p",[t._v("实验19：如果资源类型的bean不止一个，默认根据@Autowired注解标记的成员变量名作为id查找bean，进行装配★")]),t._v(" "),n("p",[t._v("实验20：如果根据成员变量名作为id还是找不到bean，可以使用@Qualifier注解明确指定目标bean的id★")]),t._v(" "),n("p",[t._v("实验21：在方法的形参位置使用@Qualifier注解")]),t._v(" "),n("p",[t._v("实验22：@Autowired注解的required属性指定某个属性允许不被设置")]),t._v(" "),n("p",[t._v("实验23：测试泛型依赖注入★")])]),t._v(" "),n("div",{staticClass:"language-xml extra-class"},[n("pre",{pre:!0,attrs:{class:"language-xml"}},[n("code",[n("span",{pre:!0,attrs:{class:"token prolog"}},[t._v('<?xml version="1.0" encoding="UTF-8"?>')]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("beans")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("xmlns")]),n("span",{pre:!0,attrs:{class:"token attr-value"}},[n("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("http://www.springframework.org/schema/beans"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n       "),n("span",{pre:!0,attrs:{class:"token attr-name"}},[n("span",{pre:!0,attrs:{class:"token namespace"}},[t._v("xmlns:")]),t._v("xsi")]),n("span",{pre:!0,attrs:{class:"token attr-value"}},[n("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("http://www.w3.org/2001/XMLSchema-instance"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n       "),n("span",{pre:!0,attrs:{class:"token attr-name"}},[n("span",{pre:!0,attrs:{class:"token namespace"}},[t._v("xmlns:")]),t._v("context")]),n("span",{pre:!0,attrs:{class:"token attr-value"}},[n("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("http://www.springframework.org/schema/context"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n       "),n("span",{pre:!0,attrs:{class:"token attr-name"}},[n("span",{pre:!0,attrs:{class:"token namespace"}},[t._v("xsi:")]),t._v("schemaLocation")]),n("span",{pre:!0,attrs:{class:"token attr-value"}},[n("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!--实验23：测试泛型依赖注入★--\x3e")]),t._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!--\n        @Autowired、@Resource、@Inject；都是自动装配的意思\n        @Autowired：最强大，Spring自己的注解\n        @Resource：j2ee：Java的标准\n\n        @Resource：扩展性更强，如果我们切换成另外一个容器框架，@Resource还是可以使用的，@Autowired就不行了\n    --\x3e")]),t._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!--实验21：在方法的形参位置使用@Qualifier注解--\x3e")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!--\n        @Target({ElementType.CONSTRUCTOR, ElementType.FIELD, ElementType.METHOD, ElementType.ANNOTATION_TYPE})\n        @Retention(RetentionPolicy.RUNTIME)\n        @Documented\n        public @interface Autowired {\n        可以在方法上使用@Autowired注解(@Qualifier也可以)，而这个方法也会在bean创建的时候自动运行，并且这个方法的每一个参数都会自动注入值\n    --\x3e")]),t._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!--实验22：@Autowired注解的required属性指定某个属性允许不被设置--\x3e")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!--实验20：如果根据成员变量名作为id还是找不到bean，可以使用@Qualifier注解明确指定目标bean的id★--\x3e")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!--实验19：如果资源类型的bean不止一个，默认根据@Autowired注解标记的成员变量名作为id查找bean，进行装配★--\x3e")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!--实验18：使用@Autowired注解实现根据类型实现自动装配★--\x3e")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v('\x3c!--\n        使用@Autowired注解，Spring会自动的为这个属性赋值，它一定是去容器中找到对应的组件\n        @Autowired\n        private BookService bookService;\n        @Autowired原理：\n            ① 先按照类型去容器中找到对应的组件：bookService = ioc.getBean(BookService.class);\n                1)找到一个，就赋值\n                2)没找到，抛异常\n                3)找到多个\n                    ① 按照变量名作为id继续匹配\n                        1)匹配上\n                        2)没有匹配上\n                          没有匹配上是因为我们按照变量名作为id继续匹配的\n                          因此我们可以使用@Qualifier("bookServiceExt")指定一个新的id\n                            找到，装配\n                            找不到，报错\n        @Autowired标注的自动装配的属性默认是一定装配上的\n            找到就装配，找不到就祭了\n        我们可以设置@Autowired(required=false)来指定属性可以没有，这是找不到就装配null\n    --\x3e')]),t._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!--实验17：使用context:exclude-filter指定扫描包时不包含的类--\x3e")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),n("span",{pre:!0,attrs:{class:"token namespace"}},[t._v("context:")]),t._v("component-scan")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("base-package")]),n("span",{pre:!0,attrs:{class:"token attr-value"}},[n("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("com.atqingke"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v('\x3c!--\n            扫描的时候可以排除一些不要的组件\n             ★ type="annotation"：指定排除规则，按照注解进行排除，标注了指定注解的组件不要\n                    expression=""：注解的全类名\n             ★ type="assignable"：指定排除某个具体的类，按照类排除\n                    expression=""：类的全类名\n                type="aspectj"：aspectj表达式\n                type="custom"：自定义一个TypeFilter；自己写代码决定哪些使用\n                type="regex"：正则表达式\n        --\x3e')]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v('\x3c!--<context:exclude-filter type="annotation" expression="org.springframework.stereotype.Controller"/>--\x3e')]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),n("span",{pre:!0,attrs:{class:"token namespace"}},[t._v("context:")]),t._v("component-scan")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!--实验16：使用context:include-filter指定扫描包时要包含的类--\x3e")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),n("span",{pre:!0,attrs:{class:"token namespace"}},[t._v("context:")]),t._v("component-scan")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("base-package")]),n("span",{pre:!0,attrs:{class:"token attr-value"}},[n("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("com.atqingke"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),n("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("use-default-filters")]),n("span",{pre:!0,attrs:{class:"token attr-value"}},[n("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("false"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v('\x3c!--\n            只扫描哪些组件，默认全部扫描进来\n            使用时一定要禁用默认扫描规则：use-default-filters="false"\n        --\x3e')]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v('\x3c!--<context:include-filter type="assignable" expression="com.atqingke.servlet.BookServlet"/>--\x3e')]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),n("span",{pre:!0,attrs:{class:"token namespace"}},[t._v("context:")]),t._v("component-scan")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!--实验15：通过注解分别创建Dao、Service、Controller（控制器：控制网站跳转逻辑）★--\x3e")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v('\x3c!--\n        通过给bean上添加某些注解，可以快速的将bean加入到ioc容器中\n        Ⅰ 某个类上添加上任何一个注解都能快速的将这个组件加入到ioc容器的管理中\n        Ⅱ Spring有四个注解：\n            @Controller：控制器；我们推荐给控制器层（servlet包下的这些）的组件加这个注解\n            @Service：业务逻辑；我们推荐业务逻辑层的组件添加这个注解\n            @Repository：给数据库层（持久化层，dao层）的组件添加这个注解\n            @Component：给不属于以上几层的组件添加这个注解\n        Ⅲ 注解可以随便加，Spring底层不会去验证你的这个组件，时候如你注解所说的就是一个dao层的或者就是一个servlet层的组件\n            我们推荐给各层这样加，是为了给程序员看的\n        Ⅳ 使用解将组件快速的加入到容器中需要几步：\n            ① 给要添加的组件上标四个注解的任何一个\n            ② 告诉Spring，自动扫描加了注解的组件；依赖context名称空间\n            ③ 一定要导入aop包，支持加注解模式的\n        Ⅴ 使用注解加入到容器中的组件，和使用配置加入到容器中的组件行为都是默认一样的\n            ① 组件的id，默认就是组件的类名首字母小写\n            ② 组件的作用域，默认就是单例的\n        Ⅵ 组件的默认行为调整\n            ① 在主键中添加默认的value属性值可以修改组件的id    @Controller("bookservletcontroller")\n            ② 在组件上添加@scope注解，可以修改作用域\n    --\x3e')]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!--\n        context:component-scan：自动组件扫描\n        base-package：指定扫描的基础包；把基础包及它下面所有的包的所有加了注解的类，自动的扫描进IOC容器\n    --\x3e")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v('\x3c!--<context:component-scan base-package="com.atqingke"/>--\x3e')]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("beans")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])])])}),[],!1,null,null,null);n.default=s.exports}}]);