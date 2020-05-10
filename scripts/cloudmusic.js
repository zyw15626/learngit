var aSpan = $("lineb").getElementsByTagName("span");
var banner = $("banner");
var index = 0;
var aLi = $("img-list").getElementsByTagName("li");
var aListName = ["list1", "list2", "list3", "list4", "list5", "list6"];
var list1 = $("list1");
var list3 = $("list3");
var imgList = $("img-list");
var timer = null;
var titles1 = $("mainTitle").getElementsByTagName("li");
var contents1 = $("main").getElementsByClassName("dom");
var titles2 = $("zxyyHeader").getElementsByTagName("li");
var contents2 = $("zxyyContent").getElementsByClassName("dot");
var xgsd = $("xgsd").getElementsByClassName("don");
var xgsdImg = $("xgsd").getElementsByTagName("img");
var xgsdNum = $("xgsd").getElementsByClassName("num");
var xgsdSongName = $("xgsd").getElementsByClassName("songName");
var xgsdSinger = $("xgsd").getElementsByClassName("singer");
var xgsdSongId = $("xgsd").getElementsByTagName("a");
var xgsdSongDuration = $("xgsd").getElementsByClassName("songDuration");
var page = 1; //初始化页码
var pageLi = $("page").getElementsByTagName("li"); //获取所有分页按钮
var titles = new Array();
var contents = new Array();
var xdsj = $("xdsj");
var xdsjImg = $("xdsj").getElementsByTagName("img");
var xdsjSongName = $("xdsj").getElementsByClassName("songName");
var xdsjSinger = $("xdsj").getElementsByClassName("singer");
var xdsjId = $("xdsj").getElementsByTagName("a");

//设置通过元素id来获取元素节点的函数
function $(id) {
    return document.getElementById(id);
}
//导航栏中切换页签
function changeTab(titles, contents) {
    if (titles.length != contents.length) return;
    var len = titles.length;
    for (var i = 0; i < len; i++) {
        var li = titles[i];
        li.id = i;
        // console.log(li);
        titles[0].className = 'selected';
        contents[0].style.display = 'block';
        titles[i].className = "";
        contents[i].style.display = 'none';
        li.onclick = function() {
            for (var j = 0; j < titles.length; j++) {
                titles[j].className = "";
                contents[j].style.display = 'none';
            }
            this.className = 'selected';
            contents[this.id].style.display = 'block';
            imgLocation('box');
        }
    }
}
window.onload = changeTab(titles1, contents1);
window.onload = changeTab(titles2, contents2);
window.onload = changeTab(pageLi, xgsd);
//对象技术检测了XMLHttpRequest对象
function getHTTPObject() {
    if (typeof XMLHttpRequest == "undefined")
        XMLHttpRequest = function() {
            try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); } catch (e) {}
            try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); } catch (e) {}
            try { return new ActiveXObject("Msxml2.XMLHTTP"); } catch (e) {}
            return false;
        }
    return new XMLHttpRequest();
}
//发送get请求到服务器来获得getBanner接口文档
function getBanner() {
    var request = getHTTPObject();
    var imgUrl = event.target.src;
    if (request) {
        request.open("GET", "http://101.133.231.121/recruit/getBanner?picUrl", true);
        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200) {
                var data = request.responseText;
                var objects = JSON.parse(data);
                console.log(objects);
                for (var i = 0; i < objects.list.length; i++) {
                    var image = $("img" + (i + 1));
                    image.setAttribute("src", objects.list[i].picUrl);
                }
            }
        };
        request.send(null);
    } else {
        alert('Sorry,your browser doesn\'t support XMLHttpRequest');
    }
}
//发送post请求获得getSongList文档
function getSongList() {
    var xhr = getHTTPObject();
    if (xhr) {
        xhr.open("POST", "http://101.133.231.121/recruit/getSongList", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var data = xhr.responseText;
                var ban = JSON.parse(data);
                var dataList = (ban.data.data);
                console.log(dataList);
                showPageSong(dataList);
            }
        };
        xhr.send("page=1&&size=999999");
    } else {
        alert('Sorry,your browser doesn\'t support XMLHttpRequest');
    }
}
//发送post请求获得getWaterFallList文档
function getWaterFallList() {
    var xhr = getHTTPObject();
    if (xhr) {
        xhr.open("POST", "http://101.133.231.121/recruit/getWaterFallList", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var data = xhr.responseText;
                var ban = JSON.parse(data);
                var dataList = (ban.data.data);
                console.log(dataList);
                showPageWaterFallT(dataList);
                showPageWaterFall(dataList);
            }
        };
        xhr.send("page=1&&size=999999");
    } else {
        alert('Sorry,your browser doesn\'t support XMLHttpRequest');
    }
}
//getSongList页面渲染
function showPageSong(dataList) {
    var len = dataList.length;
    for (var i = 0; i < len; i++) {
        var j = i + 1;
        xgsdNum[i].innerText = "0" + j;
        if (j == 10) {
            xgsdNum[i].innerText = j;
        } else if (j > 10) {
            xgsdNum[i].innerText = j;
        }
        xgsdImg[i].setAttribute("src", dataList[i].picUrl);
        xgsdSongName[i].innerText = dataList[i].name;
        xgsdSinger[i].innerText = dataList[i].singer;
        xgsdSongId[i].setAttribute("href", dataList[i]._id);
        var duration = numberTime(dataList[i].duration);
        xgsdSongDuration[i].innerText = duration;
    }
}
//将秒转化为分秒
function numberTime(number) {
    var m = 0;
    var s = parseInt(number);
    if (s > 60) {
        m = parseInt(s / 60);
        s = parseInt(s % 60);
    }
    var zero = function(v) {
        return (v >> 0) < 10 ? "0" + v : v;
    }
    return [zero(m), zero(s)].join(":");
}


window.addEventListener('load', () => {
    imgLocation('box');
    this.addEventListener('scroll', showPageWaterFall);
});

// function checkLoading(child) {
//     const xdsjContent = getChilds(child);
//     const lastTop = xdsjContent[xdsjContent.length - 1].offsetTop;
//     const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
//     const pageHeight = document.documentElement.clientHeight || document.body.clientHeight;
//     if (scrollTop + pageHeight > lastTop) {
//         return true;
//     }


//     if (imgTop - conTop <= xdsj.clientHeight) {
//         return true;
//     }
// }
// checkLoading('box');
//getWaterFallList页面前五张图片渲染
function showPageWaterFallT(dataList) {
    var len = dataList.length;
    for (var i = 0; i <= 4; i++) {
        xdsjImg[i].src = dataList[i].picUrl;
        xdsjId[i].href = dataList[i]._id;
        xdsjSongName[i].innerText = dataList[i].title;
        xdsjSinger[i].innerText = dataList[i].singer;
    }
}
//getWaterFallList页面渲染
var aDiv = [];
var aA = [];
var aBoxImg = [];
var aImg = [];

function showPageWaterFall(dataList) {
    var len = dataList.length;
    const conTop = xdsj.getBoundingClientRect().top;
    for (var i = 5; i < len; i++) {
        const oDiv = document.createElement('div');
        aDiv.push(oDiv);
        oDiv.className = 'box';
        xdsj.appendChild(oDiv);
        const boxA = document.createElement('a');
        aA.push(boxA);
        oDiv.appendChild(boxA);
        const boxImg = document.createElement('div');
        boxImg.className = 'box-img';
        aBoxImg.push(boxImg);
        boxA.appendChild(boxImg);
        const title = document.createElement('p');
        title.className = "songName";
        const singer = document.createElement('p');
        singer.className = "singer";
        boxA.appendChild(title);
        boxA.appendChild(singer);
        boxA.href = dataList[i]._id;
        title.innerText = dataList[i].title;
        singer.innerText = dataList[i].singer;
        const img = new Image();
        boxImg.appendChild(img);
        img.src = dataList[i].picUrl;
        aImg.push(img);
    }
    // const xdsjContent = getChilds('box');
    // for (var i = 0; i < len; i++) {
    //     const imgTop = aDiv[i].getBoundingClientRect().top;
    //     console.log(imgTop);
    //     if (imgTop - conTop <= xdsj.clientHeight) {
    //         const src = dataList[i].picUrl;
    //         aImg[i].setAttribute("src", src);
    //         aImg[i].classList.add('fade');
    //     }
    // }

}
//瀑布流的实现
function imgLocation(child) {
    //取出想要获取的xdsj元素下的子元素
    const xdsjContent = getChilds(child, xdsj);
    const imgWidth = xdsjContent[0].offsetWidth;
    const xdsjWidth = xdsj.offsetWidth;
    const num = parseInt(xdsjWidth / imgWidth);
    xdsj.style.cssText = 'width: ' + imgWidth * num + 'px;margin:0 auto;';
    //计算找出一行中高度最小的图片
    const heightArr = [];
    [].map.call(xdsjContent, (current, index) => {
        if (index < 5) {
            heightArr.push(current.offsetHeight);
        } else {
            const minHeight = getMin(heightArr); //得到图片最小高度
            const minIndex = getMinIndex(minHeight, heightArr); //获取最小高度图片的序列号
            current.style.position = 'absolute'; //将下一行第一张图排在高度最小的图片下面
            current.style.top = minHeight + 'px';
            current.style.left = xdsjContent[minIndex].offsetLeft + 'px';
            heightArr[minIndex] = heightArr[minIndex] + current.offsetHeight; //更新最小高度
            // console.log(minIndex);
            if (index == heightArr.length - 1) {
                current.style.cssText = 'clear:both;';
            }
        }
    });
    console.log(heightArr);
}
//将父级元素xdsj所有符合条件的子元素取出
function getChilds(child, father) {
    const childArr = [];
    const fatherAll = father.getElementsByTagName("*"); //取出父元素的所有子节点
    [].map.call(fatherAll, (current) => {
        if (current.className == child) {
            childArr.push(current);
        }
    });
    return childArr;
}
//冒泡法得到最小值
function getMin(arr) {
    var arrLen = arr.length;
    for (var i = 0, ret = arr[0]; i < arrLen; i++) {
        ret = Math.min(ret, arr[i]);
    }
    return ret;
};
//得到最小高度图片的序列号
function getMinIndex(minHeight, arr) {
    for (var i in arr) {
        if (arr[i] == minHeight) {
            return i;
        }
    }
}
//懒加载
// var winHeight = window.innerHeight || document.documentElement.clientHeight;
// function imgOnload() {
//     var len = xdsjImg.length;
//     for (var i = 0; i < len; i++) {
//         if (xdsjImg[i].getBoundingClientRect().top < window.innerHeight) {
//             xdsjImg.src = xdsjImg[i].dataset.src;
//         }
//     }
// }

// function scrollImg(fn) {
//     let timer = null;
//     let context = this;
//     return function() {
//         clearTimeout(timer);
//         timer = setTimeout(() => {
//             fn.apply(context);
//         }, 500);
//     }
// }
// window.onload = imgOnload;
// window.onscroll = scrollImg(imgOnload);
//用于改变按钮颜色的函数
function setLineBColor() {
    for (var i = 0; i < aSpan.length; i++) {
        aSpan[i].style.background = "#c8c8c8";
    }
    aSpan[index].style.background = "#c62f2f";
}
setLineBColor();
//切换到下一张图片的函数
function nextPic() {
    aListName.unshift(aListName[5]); //把数组的最后一个元素插入到第一个位置
    aListName.pop(); //删除最后一个值
    for (var i = 0; i < aLi.length; i++) {
        aLi[i].setAttribute("class", aListName[i]); //更换每个li元素的类名
    }
    index++;
    if (index > 5) {
        index = 0;
    }
    setLineBColor();
}
//切换到上一张图片的函数
function prePic() {
    aListName.push(aListName[0]); //把数组的第一个元素插入到最后的位置
    aListName.shift(); //删除第一个值
    for (var i = 0; i < aLi.length; i++) {
        aLi[i].setAttribute("class", aListName[i]);
    }
    index--;
    if (index < 0) {
        index = 5;
    }
    setLineBColor();
}

imgList.addEventListener("click", function(ev) { //点击事件监听
    if (ev.target.parentNode.className === "list3") { //点击list3向下翻页
        nextPic();
    } else if (ev.target.parentNode.className === "list1") { //点击list1向上翻页
        prePic();
    }
})
index = 0;
//设置自动播放的函数
function autoPlay() {
    nextPic();
}
//定义并调用自动播放函数
timer = setInterval(autoPlay, 5000);
//鼠标滑过时停止播放
banner.onmouseover = function() {
    clearInterval(timer);
}

//鼠标离开整个容器时继续播放至下一张
banner.onmouseout = function() {
    timer = setInterval(autoPlay, 5000);
}

//遍历所有条形导航实现划过切换至对应的图片
for (var i = 0; i < aSpan.length; i++) {
    aSpan[i].onmouseover = function() {
        clearInterval(timer);
        var nowIndex = this.tabIndex; //获取点击的索引值
        var offset = nowIndex - index; //获取翻页次数
        if (offset == 0) {
            return;
        } else if (offset > 0) { //当offset>0时向下翻页
            for (var i = 0; i < offset; i++) {
                aListName.unshift(aListName[5]); //把数组的最后一个元素插入到第一个位置
                aListName.pop(); //删除最后一个值
            }
            for (var i = 0; i < aLi.length; i++) {
                aLi[i].setAttribute("class", aListName[i]); //更换每个li元素的类名
            }
            index = nowIndex;
            setLineBColor();
        } else if (offset < 0) {
            for (var i = 0; i > offset; i--) { //此时offset是负数
                aListName.push(aListName[0]); //把数组的第一个元素插入到最后的位置
                aListName.shift(); //删除第一个值
            }
            for (var i = 0; i < aLi.length; i++) {
                aLi[i].setAttribute("class", aListName[i]); //更换每个li元素的类名
            }
            index = nowIndex;
            setLineBColor();
        }
    }
}
//切换至我喜欢的音乐页面
var fav = $("fav");
var favMusic = $("favMusic");
var dis = $("dis");
var main = $("main");
fav.onclick = function() {
    main.style.display = "none";
    favMusic.style.display = "block";
    fav.getElementsByTagName("a").className = "selected";
}
dis.onclick = function() {
    favMusic.style.display = "none";
    main.style.display = "block";
    dis.getElementsByTagName("a").className = "selected";
}

//点击歌曲封面打开歌曲播放页面
var songImg = $("songPlay").getElementsByTagName("img");
var mask = $("songPlay").getElementsByClassName("mask");
var content = $("content");
var songPage = $("songPage");
var tleft = $("button").getElementsByClassName("tleft");
songImg[0].onmouseover = function() {
    mask[0].style.display = "block";
}
songImg[0].onmouseout = function() {
    mask[0].style.display = "none";
}
songImg[0].onclick = function() {
    content.style.display = "none";
    songPage.style.display = "block";
}
tleft[0].onclick = function() {
    content.style.display = "block";
}

//点击播放条播放按钮播放歌曲
var play = $("play");
var cd = getChilds("i2", songPage);
play.onclick = function playMusic() {
    var player = $("player");
    if (player.paused) {
        player.play();
        cd[0].className = "rotate";
    } else {
        player.pause();
        cd[0].className = "i2";
    }
}

//歌词解析
var medisArray = new Array();

function createLrc() {
    var medis = $("lyrContent").innerText;
    var medises = medis.split("\n");
    medises.forEach(function(item, i) { //遍历medises并将事件和文字分开
        var t = item.substring(item.indexOf("[") + 1, item.indexOf("]"));
        medisArray.push({
            t: (t.split(":")[0] * 60 + parseFloat(t.split(":")[1])).toFixed(3),
            //将时间格式改为秒
            c: item.substring(item.indexOf("]") + 1, item.length)
        });
    });
    var ul = $("text");
    medisArray.forEach(function(item, i) {
        var li = document.createElement("li");
        li.style.cssText = 'list-style:none;';
        li.innerHTML = item.c;
        ul.appendChild(li);
    });
}
createLrc();
//歌词文字高亮滚动
var fraction = 0.5;
var topNum = 0;
// var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;

function lineHeight(lineno) {
    var ul = $("text");
    var li = ul.getElementsByTagName("li");
    //正在唱的该行高亮
    if (lineno > 0) {
        li[topNum + lineno - 1].className = "";
    }
    var nowline = li[topNum + lineno];
    nowline.className = "lineheight";
    //实现文字滚动
    var _scrollTop;
    ul.scrollTop = 0;

    if (ul.clientHeight * fraction > nowline.offsetTop) {
        _scrollTop = 0;
    } else if (nowline.offsetTop > (ul.scrollHeight - ul.clientHeight * (1 - fraction))) {
        _scrollTop = ul.scrollHeight - ul.clientHeight;
    } else {
        _scrollTop = nowline.offsetTop - ul.clientHeight * fraction;
    }
    //声明歌词高亮行固定的基准线位置
    if ((nowline.offsetTop - ul.scrollTop) >= ul.clientHeight * fraction) {
        //若高亮显示的歌词在基准线以下，就将滚动条向下移动高亮行距离顶部-滚动条已卷起高度-基准线到可视窗口距离
        ul.scrollTop += Math.ceil(nowline.offsetTop - ul.scrollTop - ul.clientHeight * fraction);
    } else if ((nowline.offsetTop - ul.scrollTop) < ul.clientHeight * fraction && _scrollTop != 0) {
        ul.scrollTop -= Math.ceil(ul.clientHeight * fraction - (nowline.offsetTop - ul.scrollTop));
    } else if (_scrollTop == 0) {
        ul.scrollTop = 0;
    } else {
        ul.scrollTop += li.style.height;
    }
}
//监听audio的timeupdate事件，实现文字与音频的同步
var lineNo = 0;
var audio = $("player");
var demo = $("demo");

audio.ontimeupdate = function() {
    if (lineNo == medisArray.length - 1 && audio.currentTime.toFixed(3) >= parseFloat(medisArray[lineNo].t)) {
        lineHeight(lineNo);
    }
    if (parseFloat(medisArray[lineNo].t) <= audio.currentTime.toFixed(3) && audio.currentTime.toFixed(3) <= parseFloat(medisArray[lineNo + 1].t)) {
        lineHeight(lineNo);
        lineNo++;
    }
};



addLoadEvent(getBanner);
addLoadEvent(setLineBColor);
addLoadEvent(autoPlay);
addLoadEvent(getSongList);
addLoadEvent(getWaterFallList);