/* jQache - BSD 3-Clause License - See LICENSE */
(function(b){b._jqache={};b._assigned=[];b._jqns=[];b._jqnsAssigned=[];b.q=function(a,c){return"undefined"!==typeof b._jqache[a]&&!("undefined"!==typeof c&&c)?b._jqache[a]:"undefined"!==typeof b._assigned[a]?b._jqache[a]=b(b._assigned[a]):b._jqache[a]=b(a)};b.q.assign=function(a){if("undefined"===typeof a.selector)return!1;"undefined"===typeof a.name&&(a.name=a.selector);a=b.extend({},{interval:0,namespace:void 0},a);if("undefined"===typeof a.namespace)return b._jqache[a.name]=b(a.selector),b._assigned[a.name]= a.selector,0<a.interval&&window.setInterval(function(){b._jqache[a.name]=b(a.selector)},1E3*a.interval),b._jqache[a.name];b._jqache[a.namespace]="undefined"!==typeof b._jqache[a.namespace]?b._jqache[a.namespace]:[];b._jqache[a.namespace][a.name]=b(a.selector);b._jqns[a.namespace]="undefined"!==typeof b._jqns[a.namespace]?b._jqns[a.namespace]:[];b._jqns[a.namespace].push(a.name);b._jqnsAssigned[a.namespace]="undefined"!==typeof b._jqnsAssigned[a.namespace]?b._jqnsAssigned[a.namespace]:[];b._jqnsAssigned[a.namespace][a.name]= a.selector;0<a.interval&&window.setInterval(function(){b._jqache[a.namespace][a.name]=b(a.selector)},1E3*a.interval);"function"!==typeof b.q[a.namespace]&&(b.q[a.namespace]=function(c,d){if("undefined"!==typeof c){d="undefined"!==typeof d?d:!1;if("undefined"!==typeof b._jqache[a.namespace][c]&&!d)return b._jqache[a.namespace][c];if("undefined"!==typeof b._jqache[a.namespace][c]&&d)return b._jqache[a.namespace][c]=b(b._jqnsAssigned[a.namespace][c])}else{var f=[],e;for(e in b._jqache[a.namespace])b._jqache[a.namespace].hasOwnProperty(e)&& f.push(b.q[a.namespace](e)[0]);return b(f)}})};b.q.clear=function(a){"undefined"===typeof a?b.each(b._jqache,function(a){"undefined"===typeof b._jqns[a]?b.q(a,!0):b.q.clear(a)}):b.each(b._jqns[a],function(c,d){b.q[a](d,!0)})}})(jQuery);