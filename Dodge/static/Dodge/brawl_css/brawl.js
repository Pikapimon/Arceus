$(".bs_container.bs_hover_small").mouseenter(function() {
  $(this).children(".bs_skew").css('width','80%').css('height','80%');
  console.log('1')
});
$(".bs_container.bs_hover_small").mouseleave(function() {
  $(this).children(".bs_skew").css('width','90%').css('height','90%');
})
$(".bs_hover_big button").mouseenter(function() {
  // $(this).css('width','100%').css('height','100%');
  console.log('enter')
});
$(".bs_hover_big button").mouseleave(function() {
  // $(this).css('width','90%').css('height','90%');
  console.log('leave')
});
$(".bs_hover_big button").mousedown(function(){
  $(this).css('width','90%').css('height','90%');
  console.log('down')
});
$(".bs_hover_big button").mouseup(function(){
  $(this).css('width','100%').css('height','100%');
  console.log('up')
})