require(
    [
        "http://code.jquery.com/jquery-1.8.3.min.js"
    ],
    function() {
        $(function() {
            setTimeout(function() {
                require(['../base/wwj'],function(lyq) {
                    $('body').html('');
                    var h1 = document.createElement('h1');
                    h1.style.cssText = 'text-align:center;padding-top:50px;'
                    lyq.log('加载完毕！').log(lyq.objCount(lyq));
                    document.body.appendChild(h1);
                    h1.innerHTML = '这是AMD模块加载！';
                })
            }, 2000);
        });
    });
