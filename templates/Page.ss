<!DOCTYPE html>
<html lang="$ContentLocale">
<head>
    $ExtendedMetaTags
    <% if $IsNotWebpackDevServer %><link href="{$WebpackBaseURL}{$ThemeDir}/dist/css/style.css" rel="stylesheet" type="text/css"  /><% end_if %>
</head>
<body id="Body$ClassName">
<div id="Wrapper">
    <header>
        <a href="/" class="home-button">$SiteConfig.Title</a>
        <% include Navigation %>
        <a href="#" class="menu-button">menu</a>
    </header
    <div id="Layout">
        <% include Breadcrumbs %>
        <div id="page-holder">
            <% include CallToAction %>
            $Layout
        </div>
        <% include Footer %>
    </div>
</div>
    <script src="{$WebpackBaseURL}{$ThemeDir}/dist/bundle.js" charset="utf-8"></script>
</body>
</html>
