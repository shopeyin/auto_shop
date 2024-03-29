// Avoid `console` errors in browsers that lack a console.x
//
//(function($) {
//
//(function() {
//    var method;
//    var noop = function () {};
//    var methods = [
//        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
//        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
//        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
//        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
//    ];
//    var length = methods.length;
//    var console = (window.console = window.console || {});
//
//    while (length--) {
//        method = methods[length];
//
//        // Only stub undefined methods.
//        if (!console[method]) {
//            console[method] = noop;
//        }
//    }
//}());
//
//})(jQuery);


// Place any jQuery/helper plugins in here.
;
(function($) {
    $(document).ready(function() {
        if (getCookie("privacy-policy")) {
            $(".privacy-policy").hide();
            $(".adblock-code").css("margin-bottom", "0");
        }
        else {
            $(".privacy-policy").show();
        }


            if ($(".sticky-sidebar-title").length !== 0) {
                var headerTop = $(".header-wrapper").height();
                var footerTop = $("#footer").offset().top;
                var windowTop;

                $(window).scroll(function() {

                    windowTop = $(window).scrollTop();
                    if ((windowTop > headerTop + 20)) {
                        $(".sticky-sidebar-title").css({'position': 'fixed', 'bottom': 'inherit', 'top': '0'});
                        if ((windowTop + 600 > footerTop - 75)) {
                            var footerScroll = windowTop + 600 - footerTop - 55;
                            $(".sticky-sidebar-title").css({'top': 'inherit', 'bottom': $("#footer").height() + footerScroll});
                        }
                    }
                    else {
                        $(".sticky-sidebar-title").css({'position': 'inherit'});
                    }
                });
            }

        //------------------- When search icon is click ---------------

        $(".search-icon").click(function(e) {

            e.preventDefault();
            $("#search-area").fadeIn(400);

            var headerHeight = $('#programiz-header').height();
            var searchFormHeight = $('#search-area form').height();
            var marginTop = (headerHeight - searchFormHeight) / 2;

            $("#search-area").css({
                'position': 'fixed',
                'width': '100%',
                'background': '#DDD !important',
                'top': '0',
                'z-index': '100',
                'height': '110px'
            });

            $("#search-area form").css({
                'margin': '0 auto',
                'margin-top': '40px'
            });

            $("#search-area .gsc-input input").focus();
        });

        $("#search-area span").click(function(e) {

            e.preventDefault();
            $("#search-area").hide();
            $("#search-area").css('position', 'static');
        });

         // ---------------------- Premium Fancy Bar ----------------------------------------------

        function setCookie(key, value, expireDate) {
            var expires = new Date();
            expires.setDate(expires.getDate() + expireDate);
            document.cookie = key + '=' + value + ';path=/;expires=' + expires.toUTCString();
        }

        function getCookie(key) {
            var re = new RegExp(key + "=([^;]+)");
            var value = re.exec(document.cookie);
            var keyValue = (value != null) ? unescape(value[1]) : null;
            return keyValue === null ? false : true;
        }

        // var crossButtonClicked = false;
        // var cross = getCookie("programizFancyBar");

        // if(cross != null) {
        //     crossButtonClicked = true;
        // }

        // $("footer").on("click" ,".fancy-cross", function(e){
        //     e.preventDefault;
        //     crossButtonClicked = true;

        //     $(".fancy-premium").slideUp(200);
        //     setCookie("programizFancyBar", true);
        // })


        // -----------------------  sidebar Menu ------------------------------------------------

        var relativeURL = window.location.pathname;
        // $("#programiz-left-sidebar a[href= '" + relativeURL + "']").addClass("currentPage");


        // $(".submenu a").click(function() {

        //     $("topmenu ").find(".currentPage").removeClass("currentPage");
        //     $(this).parent().addClass("currentPage");
        // });

        $(".header-list-menu .submenu a").each(function() {

            var href = $(this).attr('href');

            if (href.indexOf(relativeURL) > -1) {
                $(this).parent().addClass("currentPage");
                return false;
            }
        });

        $(".header-list-menu .submenu").not(':has(.currentPage)').addClass('visuallyhidden');
        $(".header-list-menu .submenu:has(.currentPage)").addClass('visuallynothidden');

        $('.header-list-menu .visuallyhidden').prev().append('<span class="indicator_hide"></span>');
        $('.header-list-menu .visuallynothidden').prev().append('<span class="indicator_show"></span>');

        $(".header-list-menu .topmenu h3").click(function() {

            var all = $(".header-list-menu.visuallynothidden");
            all.removeClass('visuallynothidden');
            all.addClass("visuallyhidden");
            $(this).next().toggleClass("visuallyhidden visuallynothidden");

            $(".indicator_hide").remove();
            $(".indicator_show").remove();
            $('.header-list-menu .visuallyhidden').prev().append('<span class="indicator_hide"></span>');
            $('.header-list-menu .visuallynothidden').prev().append('<span class="indicator_show"></span>');
        });

        // ------------------------------ Screen size (after changed as well) ----------------------

        width = $(window).width();

        if (width >= 900) {
            var recommendedReadingHeight = $(".recommended-links").height() + 3;
            $('.recommended-links').height(recommendedReadingHeight);

            if ($(".recommended-links").length !== 0) {

                $(window).scroll(function() {
                    var footerHeight = $("#footer").outerHeight();
                    var documentHeight = $(document).height();
                    var windowTop = $(window).scrollTop();
                    var recommendedReadingHeight = $(".recommended-links").height();
                    var remainingHeight = documentHeight - recommendedReadingHeight - footerHeight - 15 - 15 - 30;

                    if (windowTop > remainingHeight) {
                        var top = windowTop - remainingHeight;
                       $(".recommended-links").css("top", -top);
                    }
                });
            }
        }

        changeWidth(width);

        $(window).resize(function() {

            width = $(window).width();

            if ($(this).width() != width) {
                width = $(this).width();
            }

            changeWidth(width);
        });

        function loadMobileNavigation() {
            if($('.nav-mobile').length == 0) {
                $('body')
                    .prepend('<nav class="nav-mobile"><div><a class="material-icons back-nav">arrow_back</a><a class="material-icons close-nav">clear</a></div><ul class="nav-mobile-topmenu"></ul></nav>');
            }
            var navMobile = $('.nav-mobile');

            // Setup close button click event
            var closeButton = $('.nav-mobile .material-icons.close-nav');
            closeButton.click(function(e) {
                e.preventDefault();
                navMobile.hide();
                $('html').css('overflow', 'initial');
            });

            // Setup back button click event
            var backButton = $('.nav-mobile .material-icons.back-nav');
            backButton.click(function(e) {
                e.preventDefault();
                selectedMenu.animate({ left: parseInt(selectedMenu.css('left'),10) == 0 ? -$(selectedMenu).outerWidth() - $(window).width() : 0 });
                backButton.hide();
                closeButton.show();
            });

            // Setup menu items
            if($('.nav-mobile-topmenu li').length == 0) {
                if ($(".header-list-menu")[0] && $('.header-list-menu .topmenu')[0]) {
                    var menuItems = $('.header-list-menu .topmenu').children()
                        .each(function(index) {
                            // Set h3 titles as first level items
                            var topLevelItem = $(this).find('h3').text();
                            var prevTopLevelItem = $(this).prev()[0] ? $(this).prev().find('h3').text() : null;
                            var nextTopLevelItem = $(this).next()[0] ? $(this).next().find('h3').text() : null;

                            var subMenu = $(this).find('.submenu').clone();
                            var currentTopLevel = $('<li class="nav-mobile-outer-topmenu"><a class="' +
                                (subMenu.hasClass('visuallynothidden') ? 'nav-mobile-visuallynothidden' : '') +
                                '" href="#">' + topLevelItem + '<span class="material-icons nav-right">navigate_next</span></a></li>')
                                .appendTo('.nav-mobile-topmenu');
                            currentTopLevel.append(subMenu);

                            // Add top level elements to submenus
                            if(prevTopLevelItem != null) {
                                var prevTopLevel = $('<ul><li class="nav-mobile-prevmenu"><a href="#">' + prevTopLevelItem + '<span class="material-icons nav-right">navigate_next</span></a></li></ul>')
                                    .prependTo(subMenu);
                            }
                            if(nextTopLevelItem != null) {
                                var nextTopLevel = $('<ul><li class="nav-mobile-nextmenu"><a href="#">' + nextTopLevelItem + '<span class="material-icons nav-right">navigate_next</span></a></li></ul>')
                                    .appendTo(subMenu);
                            }
                    });

                    // Set inner menu items to far left.
                    $('.nav-mobile-topmenu .submenu').each(function(index) {
                        $(this).css('left', -$(this).outerWidth() - $(window).width() );
                    });

                } else {
                    // For non-article menus
                    $('.nav-mobile-topmenu').append($('.main-nav ul li:not(.mobile-menu):not(.desktop-only)').clone());
                    $('.nav-mobile-topmenu li').show();
                }
            }

            // Link Click handler
            $('.nav-mobile-topmenu li a').click(function(e) {
                // Top level menu items click handler.
                if($(this).attr('href') == '#') {
                    var parentMenu = $(this).parent();
                    if(parentMenu.hasClass('nav-mobile-prevmenu') || parentMenu.hasClass('nav-mobile-nextmenu')) {
                        var menuToBeClosed = $(this).closest('.submenu');
                        menuToBeClosed.animate({ left: parseInt(menuToBeClosed.css('left'),10) == 0 ? -$(menuToBeClosed).outerWidth() - $(window).width() : 0 });
                        selectedMenu = parentMenu.hasClass('nav-mobile-prevmenu')
                            ? $(this).closest('.nav-mobile-outer-topmenu').prev().find('.submenu')
                            : $(this).closest('.nav-mobile-outer-topmenu').next().find('.submenu');
                    } else {
                        selectedMenu = $(this).next();
                    }
                    selectedMenu.show();
                    setTimeout(() => selectedMenu.animate({ left: parseInt(selectedMenu.css('left'),10) == 0 ? -$(selectedMenu).outerWidth() - $(window).width() : 0 }, 750), 0);
                    closeButton.hide();
                    backButton.show();
                } else {
                    // Normal menu click handler
                    closeButton.trigger('click');
                }
            });

            // Hide the menu and back button on first load
            backButton.hide();
            navMobile.hide();

            // Replicate click for current page
            $('.nav-mobile .nav-mobile-topmenu .currentPage a').closest('ul.visuallynothidden').prev().trigger('click');
        }

        function changeWidth(width) {

            //  $(window).off('scroll');

            //--------------------------------- width less than 900 --------------------------------------

            if (width < 900) {

                $('.main-nav li').removeClass('current-nav-li');

                var classFoundInUrl = false;
                var relativeURL = window.location.pathname;

                $('.main-nav ul a').each(function() {

                    var className = $(this).attr('class').split(" ")[0];
                    if (relativeURL.indexOf(className) > -1) {

                        $(this).parent().addClass('current-nav-li');
                        classFoundInUrl = true;
                        return false;
                    }
                });

                if (classFoundInUrl == false)
                    $(".main-nav .home-icon").parent().addClass('current-nav-li');


                // navReset();

                //------------------ Hide Menubar and  Show menuicon for width < 900 ---------------------------

                // $("#programiz-left-sidebar").hide();


                $(".main-nav .current-nav-li").parent().children().hide();
                $(".main-nav .current-nav-li").show();
                // ------------------- Update this code if new theme subtheme of Ultimate is created ------------------------------//
                if(relativeURL.indexOf('/c-programming') == 0 ||
                    relativeURL.indexOf('/cpp-programming') == 0 ||
                    relativeURL.indexOf('/java-programming') == 0 ||
                    relativeURL.indexOf('/kotlin-programming') == 0 ||
                    relativeURL.indexOf('/python-programming') == 0) {
                    $(".main-nav .current-nav-li").next().show();
                }
                $(".main-nav .home-icon").parent().show();
                $(".main-nav").show();
                loadMobileNavigation();
                // $(".mobile-menu").show();

                var navRecommendedVisible = false;
                var navRecommended = $('.recommended-links h3 span');

                $(".recommended-links h3").on('click', function(e) {

                    e.preventDefault();

                    if (!navRecommendedVisible) {
                        $(".recommended-links ul").show();
                        navRecommendedVisible = true;
                        navRecommended.html("expand_less");
                        return;
                    }
                    else {
                       $(".recommended-links ul").hide();
                        navRecommendedVisible = false;
                        navRecommended.html("expand_more");
                        return;
                    }

                });

            } else {
                // $("#programiz-left-sidebar").show();

                $(".main-nav .current-nav-li").parent().children().show();
                // $(".mobile-menu").hide();

                var longList = false;
                $(".large-list-sidebar td").each(function(i) {
                    if (i > 10) {
                        $(this).addClass('visuallyhidden');
                    }
                    if (i == 11) {
                        longList = true;
                    }
                });

                if (longList === true) {
                    if ($(".view-more-button .material-icons").length == 0) {
                        $(".large-list-sidebar").append("<div class='view-more-button'><i class='material-icons'>expand_more</i></div>");
                    }
                }

                $(".view-more-button").on("click", function(){
                    $(".large-list-sidebar td").removeClass('visuallyhidden');
                    $(".view-more-button").hide();
                });

                // $(".recommended-links ul").show();
                $('.recommended-links h3 span').hide();

                if ($(".recommended-links").length !== 0) {

                    $(window).scroll(function() {
                        var footerHeight = $("#footer").outerHeight();
                        var documentHeight = $(document).height();
                        var windowTop = $(window).scrollTop();
                        var recommendedReadingHeight = $(".recommended-links").height();
                        var remainingHeight = documentHeight - recommendedReadingHeight - footerHeight - 15 - 15 - 30;

                        if (windowTop > remainingHeight) {
                            var top = windowTop - remainingHeight;
                           $(".recommended-links").css("top", -top);
                        }
                    });
                }
            }


            //---------------------------------------- width less than 1366px --------------------------------------

            // if (width < 900) {
            //     navReset();
            //     var timer;
            //     var elementPosition = $(".main-nav-wrapper").offset();

                //----------------------------- sticky navigation after scroll ------------------------------------------

            //     $(document).on('scroll', function() {
            //         var scrollTop = $(window).scrollTop();

            //         if (scrollTop <= 63 || (width < 900 && window.innerWidth > window.innerHeight)) {
            //             $('.main-nav-wrapper').css({
            //                 'position': 'static'
            //             });
            //             $('#main-wrapper').css({
            //                 'margin-top': '0'
            //             });
            //             $('#front-page-main-wrapper').css({
            //                 'margin-top': '0'
            //             });
            //         } else {
            //             $('.main-nav-wrapper').css({
            //                 'position': 'fixed',
            //                 'top': '0',
            //                 'width': '100%'
            //             });
            //             $('#main-wrapper').css({
            //                 'margin-top': '64px'
            //             });
            //             $('#front-page-main-wrapper').css({
            //                 'margin-top': '64px'
            //             });
            //         }
            //     });
            // }


            //--------------------------------- width greater than 1366px --------------------------------------

            // if (width >= 1366) {

            //  navReset();

            //  $("#programiz-header").css({
            //      'position': 'fixed',
            //      'top': '0',
            //      'width': '100%'
            //  });

            //  $("#main-wrapper").css({
            //      'margin-top': '66px'
            //  });

            //  $("#front-page-element-container").css({
            //      'margin-top': '66px'
            //  });
            // }
        }

        //-------------------- Reset elements realated to naviation when screen is changed ----------------------
        function navReset() {
            //$("#search-area").hide();
            $('.main-nav-wrapper').css({
                'position': 'static'
            });
            $('#programiz-header').css({
                'position': 'static'
            });
            $('#main-wrapper').css({
                'margin-top': '0'
            });
            $('#front-page-main-wrapper').css({
                'margin-top': '0'
            });
        }


        // ------------------------ Mobile Menu --------------------------------------------

        target = {};

        $('.main-nav').on('click', '.mobile-menu > a.material-icons', function(e) {
            e.preventDefault();

            $('.nav-mobile').toggle();
            $('html').css('overflow', 'hidden');
        });

        // $('.mobile-menu').sidr({
        //     name: 'sidr-left',
        //     source: '.header-list-menu',
        //     onOpenEnd: onOpenEndCallback,
        //     onClose: onCloseCallback
        // });

        // $('.mobile-menu-subtheme').sidr({
        //     name: 'sidr-left',
        //     source: '.header-list-menu',
        //     onOpenEnd: onOpenEndCallback,
        //     onClose: onCloseCallback
        // });

        // if ($(".header-list-menu")[0])
        // {
        //     $('.mobile-menu').sidr({
        //         name: 'sidr-left',
        //         source: '.header-list-menu',
        //         onOpenEnd: onOpenEndCallback,
        //         onClose: onCloseCallback
        //     });

        //     $('.mobile-menu-subtheme').sidr({
        //         name: 'sidr-left',
        //         source: '.header-list-menu',
        //         onOpenEnd: onOpenEndCallback,
        //         onClose: onCloseCallback
        //     });
        // }
        // else
        // {
        //     $('.mobile-menu').sidr({
        //         name: 'default-mobile-menu',
        //         source: '.main-nav',
        //         onOpenEnd: onOpenEndCallback,
        //         onClose: onCloseCallback
        //     });

        //     $('.mobile-menu-subtheme').sidr({
        //             name: 'default-mobile-menu',
        //             source: '.main-nav',
        //             onOpenEnd: onOpenEndCallback,
        //             onClose: onCloseCallback
        //         });
        // }

        // var dragging = false;
        // var opened = false;

        // $("#sidr-left").bind('touchmove', function() {
        //     dragging = true;
        // });

        // $("#sidr-left").bind('touchstart', function() {
        //     dragging = false;
        // });

        // function onOpenEndCallback() {
        //     $(document).bind('touchend', enableMenuClose);
        // }

        // function disableMenuClose(e) {
        //     menuClose = false;
        // }

        // function enableMenuClose(e) {
        //     if(dragging) {
        //         dragging = false;
        //         return;
        //     }

        //     var container = $("#sidr-left");
        //     if ((!container.is(e.target)// && container.has(e.target).length === 0)
        //        && container.has(e.target).length === 0) ||
        //         (container.has(e.target).length > 0 && typeof $(e.target).attr("href") !== 'undefined' && $(e.target).attr("href").indexOf("#") !== -1))
        //     {
        //         setTimeout(function() {
        //             $.sidr('close', 'sidr-left');
        //         }, 200);
        //     }
        // }

        // function disableClick(e) {
        //     e.preventDefault();
        //     return false;
        // }

        // function onCloseCallback() {
        //     $(document).unbind('touchend', enableMenuClose);
        //     // $(document).unbind('mouseup', enableMenuClose);
        //     // $(".header-list-menu a").unbind("mouseup", enableMenuClose);
        //     // $(".header-list-menu a").unbind("touchend", enableMenuClose);
        // }

        // -------------------------- scroll to top -----------------------------

        var isAdBlockActive = null;

        $.getScript('/ads.js')
            .done(function(data, textStatus) {
                isAdBlockActive = false;
            })
            .fail(function( jqxhr, settings, exception ) {
                isAdBlockActive = true;
                showAdBlockCreative();
        });
        $.getScript('/imads.js')
            .done(function(data, textStatus) {
                isAdBlockActive = false;
            })
            .fail(function( jqxhr, settings, exception ) {
                isAdBlockActive = true;
                showAdBlockCreative();
        });

        function showAdBlockCreative() {
            $(".adblock-creative").show();
        }

        var documentHeight =$(document).height();

        $(window).scroll(function() {

            if ($(this).scrollTop() > 200 && $(".fancy-premium:first").is(":hidden") && crossButtonClicked == false) {
                $(".fancy-premium").slideDown(400);
            }

            if ($(this).scrollTop() <= 200 && $(".fancy-premium:first").is(":visible")) {
                $(".fancy-premium").slideUp(300);
            }

            if ($(this).scrollTop()) {
                $('#back-to-top').fadeIn();
            } else {
                $('#back-to-top').fadeOut();
            }

            if(isAdBlockActive && $(this).scrollTop()/documentHeight > 0.5 && !getCookie("adblock-code")) {
                if ($(".adblock-code").length !== 0) {
                    $(".adblock-code").slideDown(700);
                }
            }
        });



        $("#back-to-top").click(function() {
          $("html, body").animate({ scrollTop: 0 }, "slow");
        });

        $(".adblock-code .material-icons").click(function() {
            $(".adblock-code").hide();
            setCookie("adblock-code", false, 1);
        });

        $(".privacy-continue").click(function() {
            $(".privacy-policy").hide();
            $(".adblock-code").css("margin-bottom", 0);
            setCookie("privacy-policy", false, 364);
        });

        if($(".privacy-policy").is(':visible')) {
            $(".adblock-code").css("margin-bottom", $(".privacy-policy").height());
        }
        else {
            $(".adblock-code").css("margin-bottom", "0");
        }

        // ------------------ Share button and fixed sidebar -------------------------
        $(window).on("load", function() {

            if ($('.recommended-links').length > 0) {
                var sidebarScrollTop = $(".recommended-links").offset().top;

                $(".header-list-menu .topmenu h3").click(function() {
                    sidebarScrollTop = $(".recommended-links").offset().top;
                });

                $(".view-more-button").click(function() {
                    sidebarScrollTop = $(".recommended-links").offset().top;
                });
            }

            if (window.location.hash) {
                $(".recommended-links").addClass('fix-sidebar');
            }

            if (sidebarScrollTop != null) {
                $(document).scroll(function() {
                    if (sidebarScrollTop != null) {
                        if ($(document).scrollTop() >= sidebarScrollTop) {
                            $(".recommended-links").addClass('fix-sidebar');
                        } else {
                            $(".recommended-links").removeClass('fix-sidebar');
                        }
                    }
                });
            }

            var os;
            os = getOS();

            var playStoreUrl = "https://play.google.com/store/apps/details?id=com.programiz.learnpython",
                appStoreUrl  = "/learn-python",
                desktopUrl = "/learn-python";
                
            if (os == 'Android') {
                $(".nav-get-python-app").attr("href", playStoreUrl);
            }
            else if (os = "iOS") {
                $(".nav-get-python-app").attr("href", desktopUrl); 
            }
            else {
                $(".nav-get-python-app").attr("href", desktopUrl); 
            }
        });

        // Programming IDE code begin
        var ideFilter = {"ideFor": "", "isIdeRecommended": ""};

        function selectActiveIDEFilter(ideFilter) {
          switch (ideFilter["ideFor"])
          {
            case "ide-learn":
            $(".ide-filter-learning").addClass("ide-filter-active");
            $(".ide-filter-learning").siblings().removeClass("ide-filter-active");
            break;

            case "ide-development":
            $(".ide-filter-development").siblings().removeClass("ide-filter-active");
            $(".ide-filter-development").addClass("ide-filter-active");
            break;

            default:
            $(".ide-filter-learning").removeClass("ide-filter-active");
            $(".ide-filter-development").removeClass("ide-filter-active");
          }

          if(ideFilter["isIdeRecommended"] == "ide-recommended-yes")
          {
            $(".ide-programiz-recommended").addClass("ide-filter-active");
          }
          else
          {
            $(".ide-programiz-recommended").removeClass("ide-filter-active");
          }
        }
        function hideAllIdeItem() {
          if ($(".ide-item").length != 0)
          {
            $(".ide-item").hide();
          }
        }
        function showFilteredIDEs(ideFilter){
          if ((ideFilter['ideFor'] == "ide-learn") && (ideFilter["isIdeRecommended"] == "ide-recommended-yes"))
          {
            hideAllIdeItem();
            $(".ide-learn.ide-recommended-yes").show();
          }

          if ((ideFilter['ideFor'] == "ide-development") && (ideFilter["isIdeRecommended"] == "ide-recommended-yes"))
          {
            hideAllIdeItem();
            $(".ide-development.ide-recommended-yes").show();
          }

          if (ideFilter['ideFor'] == "ide-learn" && ideFilter["isIdeRecommended"] == "")
          {
            hideAllIdeItem();
            $(".ide-learn").show();
          }

          if (ideFilter['ideFor'] == "ide-development" && ideFilter["isIdeRecommended"] == "")
          {
            hideAllIdeItem();
            $(".ide-development").show();
          }

          if (ideFilter['ideFor'] == "" && ideFilter["isIdeRecommended"] == "ide-recommended-yes")
          {
            hideAllIdeItem();
            $(".ide-recommended-yes").show();
          }

          if (ideFilter['ideFor'] == "" && ideFilter["isIdeRecommended"] == "")
          {
            $(".ide-item").show();
          }
        }
        function updateIdeFilterJSON(attr, value) {
          ideFilter[attr] = (ideFilter[attr] == value) ? "": value;
          selectActiveIDEFilter(ideFilter);
          showFilteredIDEs(ideFilter);
          console.log(ideFilter);
        }

        $(".ide-filter-learning").click(function(e)
        {
          e.preventDefault();
          updateIdeFilterJSON("ideFor", "ide-learn");
        });

        $(".ide-filter-development").click(function(e) {
          e.preventDefault();
          updateIdeFilterJSON("ideFor", "ide-development");
        });

        $(".ide-programiz-recommended").click(function(e) {
          e.preventDefault();
          updateIdeFilterJSON("isIdeRecommended", "ide-recommended-yes");
        });

    });

    // Detect os
    function getOS() {
        var userAgent = window.navigator.userAgent,
            platform = window.navigator.platform,
            macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
            windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
            iosPlatforms = ['iPhone', 'iPad', 'iPod'],
            os = null;
      
        if (macosPlatforms.indexOf(platform) !== -1) {
          os = 'Mac OS';
        } else if (iosPlatforms.indexOf(platform) !== -1) {
          os = 'iOS';
        } else if (windowsPlatforms.indexOf(platform) !== -1) {
          os = 'Windows';
        } else if (/Android/.test(userAgent)) {
          os = 'Android';
        } else if (!os && /Linux/.test(platform)) {
          os = 'Linux';
        }
      
        return os;
      }

      
})(jQuery);
;
