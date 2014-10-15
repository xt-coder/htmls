function $obj(id) {
	return document.getElementById(id);
}
function infodel(a,b,c,d)
{
	if(!confirm('确定要操作吗？\n\n此操作不可以恢复！'))return ;
	setbg(a,b,c,d);
}