$(function () {
    const checkAlls = $(`.checkAll`)
    const checkItems = $(`.checkItem`)
    //为每全选框注册change事件
    checkAlls.change(function () {
        $(`:checkbox`).not(this).prop(`checked`, $(this).prop(
            `checked`
        ))
        setTotal()
    })

    //检查次选框是否选满
    //是则反选全选框，否则取消全选框
    function change() {
        const checkedCount = checkItems.filter(function () {
            return $(this).prop(`checked`) === true
        })
        if (checkedCount.length === 3) {
            checkAlls.prop(`checked`, true)
        } else {
            checkAlls.prop(`checked`, false)
        }
        setTotal()
    }
    checkItems.change(change)

    //注册点击数量加减事件
    const decrs = $(`.item .num .decr`)
    const incrs = $(`.item .num .incr`)
    decrs.click(function (e) {
        e.preventDefault()
        let count = +$(this).next().val()
        count--
        if (count < 1) {
            count = 1
        }
        $(this).next().val(count)
        setTotal()
    })

    incrs.click(function (e) {
        e.preventDefault()
        let count = +$(this).prev().val()
        count++
        $(this).prev().val(count)
        setTotal()
    })

    /**
     * 
     * 设置汇总信息
     */
    function setTotal() {
        //获取所有被选中的多选框
        const checkeds = $(`:checked:not(.checkAll)`)
        let number = checkeds.length
        let sum = 0

        checkeds.each((i, dom) => {
            sum += +$(dom)
                .parents(`.item`)
                .find(`.price em`)
                .text().replace(`￥`, ``)
            sum *= +$(dom)
                .parents(`.item`)
                .find(`.num input`)
                .val()
        })

        const nums = $(`.footer .right .nums em`)
        const sums = $(`.footer .right .sums em`)
        nums.text(number)
        sums.text(`￥${sum.toFixed(2)}`)
    }

    //注册删除事件
    const deletes = $(`.item .del a`)
    deletes.click(function (e) {
        e.preventDefault()
        const checkbox = $(this)
            .parents(`.item`)
            .find(`input[type = checkbox]`)
        checkbox.prop(`checked`, false)
        checkAlls.prop(`checked`, false)
        const num = $(this)
        .parents(`.item`)
        .find(`input[type = text]`)
        num.val(1)
        setTotal()
    })

    //注册删除选中商品事件
    //注册清空购物车事件
    const delChecked = $(`.footer .operation .delChecked`)
    const clearAll = $(`.footer .operation .clearAll`)

    function onDeleteAll() {
        checkItems.prop(`checked`, false)
        checkAlls.prop(`checked`, false)
        decrs.each((i, dom) => {
            $(dom).next().val(1)
        })
        setTotal()
    }

    delChecked.click(function (e) {
        e.preventDefault()
        onDeleteAll()
    })

    clearAll.click(function (e) {
        e.preventDefault()
        onDeleteAll()
    })
})
