(window.webpackJsonp=window.webpackJsonp||[]).push([[63],{413:function(e,t,o){"use strict";o.r(t);var r=o(14),n=Object(r.a)({},(function(){var e=this._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":this.$parent.slotKey}},[e("h2",{attrs:{id:"_6、registerbeanpostprocessors-beanfactory-注册beanpostprocessor-bean的后置处理器-【intercept-bean-creation-】"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_6、registerbeanpostprocessors-beanfactory-注册beanpostprocessor-bean的后置处理器-【intercept-bean-creation-】"}},[this._v("#")]),this._v(" 6、registerBeanPostProcessors(beanFactory); 注册BeanPostProcessor（Bean的后置处理器）【intercept bean creation.】")]),this._v(" "),e("blockquote",[e("ul",[e("li",[this._v("6、registerBeanPostProcessors(beanFactory); 注册BeanPostProcessor（Bean的后置处理器）【intercept bean creation.】\n不同接口类型的BeanPostProcessor在Bean创建前后的执行时机是不一样的\nBeanPostProcessor、\nDestructionAwareBeanPostProcessor、\nInstantiationAwareBeanPostProcessor、\nSmartInstantiationAwareBeanPostProcessor、\nMergedBeanDefinitionPostProcessor\n1、获取所有的BeanPostProcessor，后置处理器都默认可以通过PriorityOrdered、Ordered接口来指定优先级\n2、先注册PriorityOrdered优先级接口的BeanPostProcessor\n把每一个BeanPostProcessor添加到BeanFactory中\nbeanFactory.addBeanPostProcessor(postProcessor);\n3、再注册Ordered接口的\n4、注册一些剩下的\n5、最终注册MergedBeanDefinitionPostProcessor\n6、beanFactory.addBeanPostProcessor(new ApplicationListenerDetector(applicationContext)); 注册一个ApplicationListenerDetector来在Bean创建完成后检查是否是ApplicationListener，\n如果是this.applicationContext.addApplicationListener((ApplicationListener<?>) bean);")])])])])}),[],!1,null,null,null);t.default=n.exports}}]);