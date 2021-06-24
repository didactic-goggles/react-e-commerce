import * as bootstrap from 'bootstrap/dist/js/bootstrap.bundle';
import $ from 'jquery';
window.addEventListener('DOMContentLoaded', () => {
  const mainNav = document.querySelector('#mainNav');
  if (mainNav) {
    [...mainNav.querySelectorAll('.nav-item.dropdown')].forEach((navItem) => {
      const dropdown = new bootstrap.Dropdown(
        navItem.querySelector('.dropdown-toggle')
      );
      navItem.addEventListener('mouseover', (event) => {
        dropdown.show();
      });
      navItem.addEventListener('mouseleave', (event) => {
        dropdown.hide();
      });
    });
  }
  const resizeObserver = new ResizeObserver((entries) => {
    // console.log('Body height changed:', entries[0].target.clientHeight);
    if (window.scrollElement && window.scrollElement._ps) window.scrollElement._ps.update();
  });
  setTimeout(() => {
    if (document.querySelector('#root main'))
      resizeObserver.observe(document.querySelector('#root main'));
  }, 2000);
});

/*Textbox Events*/
$(document).on('focusin', 'input.search-textbox', function(){
  if($(this).val() <= 0){
      var parent = $(this).closest('div.searchbox');
      parent.addClass('focused');
  }
});
$(document).on('focusout', 'input.search-textbox', function(){
  if($(this).val() <= 0){
      var parent = $(this).closest('div.searchbox');
      parent.removeClass('focused');
  }
});
$(document).on('click', '.searchbox', function(){
  $(this).children('input.search-textbox').trigger('focus');
});

/*Text Key Events for Animating Icons i.e. .ico-btn*/
$(document).on('keyup', 'input.search-textbox', function(){
  var parent = $(this).closest('div.searchbox');
  var phrase = $(this).val(),
      phrase_length = phrase.length;

  if(phrase_length >= 2){
      parent.addClass('multi-char');
      if(!parent.hasClass('not-null')){
          parent.addClass('not-null');
      }

  }
  else if(phrase_length === 1){
      parent.addClass('not-null');
      parent.removeClass('multi-char');
  }
  else if(phrase_length <= 0){
      parent.removeClass('not-null');
      parent.removeClass('multi-char');
  }
});

// /*Tab Highlighter Functionality*/
// $(document).on('click', '#mainNav ul li a', function(){
//   var $this = $(this);
//   TabHighlighter.set($this);
//   $this.closest('li').siblings('.active').removeClass('active');
//   $this.closest('li').addClass('active');
// });
// var TabHighlighter = {
//   set: function($this){
//       $('.tab-highlighter').css({
//           'left':  `calc(${$this.closest('li')[0].offsetLeft + 'px'} + 2px)`,
//           'width': $this.closest('li').outerWidth()
//       });
//   },
//   refresh: function(){
//       var $this = $('ul li a.active');
//       console.log($this.closest('li').offsetLeft)
//       $('.tab-highlighter').css({
//           'left':  `calc(${$this.closest('li')[0].offsetLeft + 'px'} + 2px)`,
//           'width': $this.closest('li').outerWidth()
//       });
//   }
// };
// $(window).resize(function(){
//   TabHighlighter.refresh();
// });
// $(document).ready(function(){
// TabHighlighter.refresh();
// });
