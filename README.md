# Breakpoint Handler
## Install
```
bower install breakpoint-handler --save
```

## Example 
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <script   src="https://code.jquery.com/jquery-2.2.3.js"   integrity="sha256-laXWtGydpwqJ8JA+X9x2miwmaiKhn8tVmOVEigRNtP4="   crossorigin="anonymous"></script>

    <script src="bower_components/resize-handler/resizeHandler.js"></script>
    <script src="breakpointHandler.js"></script>
    <meta charset="UTF-8">
    <title>Breakpoint Handler</title>
    <style>
        .red {
            color: red;
            font-weight: bold;
        }
        .green {
            color: green;
            font-weight: bold;
        }
        .blue {
            color: blue;
            font-weight: bold;
        }
    </style>

</head>
<body>
    <p class="justsmall">nur bei small zu sehen</p>
    <p class="justxsmall">nur bei xsmall zu sehen</p>
    <p class="justmedium">nur bei medium zu sehen</p>
    <p class="justxmedium">nur bei xmedium zu sehen</p>
    <p class="justlarge">nur bei large zu sehen</p>

    <p class="smallup">ab small aufwärts</p>
    <p class="xsmallup">ab xsmall aufwärts</p>
    <p class="mediumup">ab medium aufwärts</p>
    <p class="xmediumup">ab xmedium aufwärts</p>
    <p class="largeup">ab large aufwärts</p>

    <p class="smalldown">small und kleiner</p>
    <p class="xsmalldown">xsmall und kleiner</p>
    <p class="mediumdown">medium und kleiner</p>
    <p class="xmediumdown">xmedium und kleiner</p>
    <p class="largedown">large und kleiner</p>

    <script>
        [
            // named media queries for current breakpoints ONLY
            {name: 'small', value: '(min-width: 0px) and (max-width: 479px)'},
            {name: 'xsmall', value: '(min-width: 480px) and (max-width: 767px)'},
            {name: 'medium', value: '(min-width: 768px) and (max-width: 1023px)'},
            {name: 'xmedium', value: '(min-width: 1024px) and (max-width: 1199px)'},
            {name: 'large', value: '(min-width: 1200px)'},

            // named media queries for current breakpoints AND LARGER
            {name: 'min-small', value: '(min-width: 0px)'}, // same effect as current 'small'
            {name: 'min-xsmall', value: '(min-width: 480px)'},
            {name: 'min-medium', value: '(min-width: 768px)'},
            {name: 'min-xmedium', value: '(min-width: 1024px)'},
            {name: 'min-large', value: '(min-width: 1200px)'}, // same effect as current 'large'

            // named media queries for current breakpoints AND SMALLER
            {name: 'max-small', value: '(max-width: 479px)'}, // same effect as current 'small'
            {name: 'max-xsmall', value: '(max-width: 767px)'},
            {name: 'max-medium', value: '(max-width: 1023px)'},
            {name: 'max-xmedium', value: '(max-width: 1199px)'},
            {name: 'max-large', value: '(max-width: 9999px)'} // same effect as current 'large'
        ].forEach(function(data) {
            BreakpointHandler.appendRule(data.name, data.value);
        });

        BreakpointHandler.listener('small').success(function() { $('.justsmall').addClass('red'); }).failed(function() { $('.justsmall').removeClass('red'); }).execute();
        BreakpointHandler.listener('xsmall').success(function() { $('.justxsmall').addClass('red'); }).failed(function() { $('.justxsmall').removeClass('red'); }).execute();
        BreakpointHandler.listener('medium').success(function() { $('.justmedium').addClass('red'); }).failed(function() { $('.justmedium').removeClass('red'); }).execute();
        BreakpointHandler.listener('xmedium').success(function() { $('.justxmedium').addClass('red'); }).failed(function() { $('.justxmedium').removeClass('red'); }).execute();
        BreakpointHandler.listener('large').success(function() { $('.justlarge').addClass('red'); }).failed(function() { $('.justlarge').removeClass('red'); }).execute();

        BreakpointHandler.listener('min-small').success(function() { $('.smallup').addClass('green'); }).failed(function() { $('.smallup').removeClass('green'); }).execute();
        BreakpointHandler.listener('min-xsmall').success(function() { $('.xsmallup').addClass('green'); }).failed(function() { $('.xsmallup').removeClass('green'); }).execute();
        BreakpointHandler.listener('min-medium').success(function() { $('.mediumup').addClass('green'); }).failed(function() { $('.mediumup').removeClass('green'); }).execute();
        BreakpointHandler.listener('min-xmedium').success(function() { $('.xmediumup').addClass('green'); }).failed(function() { $('.xmediumup').removeClass('green'); }).execute();
        BreakpointHandler.listener('min-large').success(function() { $('.largeup').addClass('green'); }).failed(function() { $('.largeup').removeClass('green'); }).execute();

        BreakpointHandler.listener('max-small').success(function() { $('.smalldown').addClass('blue'); }).failed(function() { $('.smalldown').removeClass('blue'); }).execute();
        BreakpointHandler.listener('max-xsmall').success(function() { $('.xsmalldown').addClass('blue'); }).failed(function() { $('.xsmalldown').removeClass('blue'); }).execute();
        BreakpointHandler.listener('max-medium').success(function() { $('.mediumdown').addClass('blue'); }).failed(function() { $('.mediumdown').removeClass('blue'); }).execute();
        BreakpointHandler.listener('max-xmedium').success(function() { $('.xmediumdown').addClass('blue'); }).failed(function() { $('.xmediumdown').removeClass('blue'); }).execute();
        BreakpointHandler.listener('max-large').success(function() { $('.largedown').addClass('blue'); }).failed(function() { $('.largedown').removeClass('blue'); }).execute();
    </script>
</body>
</html>
```
