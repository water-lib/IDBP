//旧密码
function myFunctionforPast(){
	var n=document.getElementById("pwdpast").value;
	
	if(n==""){
		document.getElementById("pwdpast-text").innerHTML="不能为空";
		document.getElementById("pwdpast-text").className="pwdclass";
	}
	else{
		document.getElementById("pwdpast-text").innerHTML="";
		document.getElementById("pwdpast-text").className="";
	}
}
//再次输入密码
function myFunctionforTwice(){
	var m=document.getElementById("pwd2").value;
	var x=document.getElementById("pwd1").value; 
	if(m==""){
		document.getElementById("twicepwd").innerHTML="不能为空";
		document.getElementById("twicepwd").className="pwdclass";
	}
	else{
		document.getElementById("twicepwd").innerHTML=""
		document.getElementById("twicepwd").className="";
	}
	if(m!=x){
		document.getElementById("twicepwd").innerHTML="两次密码输入不一致";
		document.getElementById("twicepwd").className="pwdclass";
	}
}
//新密码
var oInput = document.getElementById('pwd1');
oInput.value = '';
var spans = document.getElementsByTagName('span');
var spans1=[];
var j=0;
for(var i=0;i<spans.length;i++)
{
	if(spans[i].className=="aaa"){
	spans1[j]=spans[i];
	j++;
	}
}
function checkpw1() {
	var x=document.getElementById("pwd1").value;
	var p=document.getElementById("pwdpast").value;
	spans1[0].className = spans1[1].className = spans1[2].className = "default";
							
	//var pwd = oInput.value;//x
	var result = 0;
	for(var i = 0, len = x.length; i < len; ++i){
		result |= charType(x.charCodeAt(i));
	}

	var level = 0;
	//对result进行四次循环，计算其level
	for(var i = 0; i <= 4; i++){
		if(result & 1){
			level ++;
		}
		//右移一位
		result = result >>> 1;
	}

	if(x.length >= 3){
		switch (level) {
			case 1:
				spans1[0].className = "weak";
				break;
			case 2:
				spans1[0].className = "medium";
				spans1[1].className = "medium";
				break;
			case 3:
			case 4:
				spans1[0].className = "strong";
				spans1[1].className = "strong";
				spans1[2].className = "strong";
				break;
		}
	}
	if(x== "") {
		document.getElementById("newpwd").innerHTML="不能为空";
		document.getElementById("newpwd").className="pwdclass";
		return false;
	}
	if(x!= "") {
		if(x.length < 8 ||x.length>16) {
			document.getElementById("newpwd").innerHTML="长度为8~16个字符";
			document.getElementById("newpwd").className="pwdclass";
			return false;
		}
		else{
			document.getElementById("newpwd").innerHTML="";
			document.getElementById("newpwd").className="";
		}
		if(x == p) {
			document.getElementById("newpwd").innerHTML="不能是近期使用过的密码，请重新输入";
						document.getElementById("newpwd").className="pwdclass2";
			return false;
		}
		// ^\S
		re = /((?=.*\d)(?=.*\D)|(?=.*[a-zA-Z])(?=.*[^a-zA-Z]))(?!^.*[\u4E00-\u9FA5].*$)^\S{8,16}$/;
		if(!re.test(x)) {
			document.getElementById("newpwd").innerHTML="密码必须包含数字/字母/字符两种组合,且不能含有空格";
			document.getElementById("newpwd").className="pwdclass2";
			return false;
		}
		re = /[@#\$%\^&\*]+/g;
		if(re.test(x)) {
			document.getElementById("newpwd").innerHTML="不能有非法字符"
			document.getElementById("newpwd").className="pwdclass";
			return false;
		}
	} else {
		document.getElementById("newpwd").innerHTML="";
		return false;
	}
	return true;
}
function charType(num){
	if(num >= 48 && num <= 57){
		return 1;
	}
	if (num >= 97 && num <= 122) {
		return 2;
	}
	if (num >= 65 && num <= 90) {
		return 4;
	}
	return 8;
}