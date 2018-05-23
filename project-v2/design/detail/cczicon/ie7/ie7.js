/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'cczicon\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon-menu': '&#xe20e;',
		'icon-list': '&#xe2aa;',
		'icon-more-horizon': '&#xe20f;',
		'icon-more-vert': '&#xe210;',
		'icon-add-circle': '&#xe06c;',
		'icon-remove_circle': '&#xe081;',
		'icon-cancel-circle': '&#xe29c;',
		'icon-add_circle': '&#xe06b;',
		'icon-cancel_circle': '&#xe205;',
		'icon-error': '&#xe000;',
		'icon-info': '&#xe2a2;',
		'icon-help': '&#xe29b;',
		'icon-repeat': '&#xe023;',
		'icon-links': '&#xe28d;',
		'icon-home2': '&#xe29e;',
		'icon-portrait': '&#xe1a7;',
		'icon-image': '&#xe186;',
		'icon-bookmark': '&#xe27c;',
		'icon-filter': '&#xe175;',
		'icon-folder2': '&#xe101;',
		'icon-check': '&#xe206;',
		'icon-check_circle': '&#xe281;',
		'icon-time': '&#xe08e;',
		'icon-favorite': '&#xe291;',
		'icon-magnifier': '&#xe63b;',
		'icon-cog': '&#xe686;',
		'icon-close': '&#xe616;',
		'icon-angle-up': '&#xe60e;',
		'icon-angle-down': '&#xe619;',
		'icon-arrow-down': '&#xf35f;',
		'icon-arrow-up': '&#xf365;',
		'icon-arrow-left': '&#xe625;',
		'icon-return': '&#xe900;',
		'icon-home': '&#xe712;',
		'icon-new': '&#xe71e;',
		'icon-marker-circle': '&#xe763;',
		'icon-tag': '&#xe70a;',
		'icon-tags': '&#xe70b;',
		'icon-file': '&#xe7b1;',
		'icon-folder': '&#xe7c2;',
		'icon-download': '&#xe656;',
		'icon-crown': '&#xe711;',
		'icon-message': '&#xe6de;',
		'icon-bell': '&#xe798;',
		'icon-bell-ring': '&#xe799;',
		'icon-pen': '&#xe67a;',
		'icon-pens': '&#xe67b;',
		'icon-share': '&#xe65f;',
		'icon-rss': '&#xf143;',
		'icon-tistory': '&#xe600;',
		'icon-github': '&#xe82e;',
		'icon-kakaostory': '&#xe838;',
		'icon-path': '&#xe839;',
		'icon-evernote': '&#xe83e;',
		'icon-line-messenger': '&#xe84b;',
		'icon-twitter': '&#xe81b;',
		'icon-facebook': '&#xf230;',
		'icon-google-plus': '&#xe81a;',
		'icon-naver': '&#xe820;',
		'icon-youtube': '&#xf166;',
		'icon-twitch': '&#xf4ed;',
		'icon-pocket': '&#xe827;',
		'icon-mac': '&#xf179;',
		'icon-windows': '&#xf17a;',
		'icon-android': '&#xf17b;',
		'icon-linux': '&#xf17c;',
		'icon-bug': '&#xf188;',
		'icon-smiley': '&#xe6ee;',
		'icon-lock-circle': '&#xf23e;',
		'icon-angle_up': '&#xe901;',
		'icon-angle_down': '&#xe903;',
		'icon-angle-left': '&#xe904;',
		'icon-angle-right': '&#xe905;',
		'icon-soundcloud': '&#xe902;',
		'icon-vimeo': '&#xea9d;',
		'icon-enter': '&#xea13;',
		'icon-exit': '&#xea14;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
