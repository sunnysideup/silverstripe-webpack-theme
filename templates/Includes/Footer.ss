<footer class="typography" id="footer">

    <div id="FooterContactInfo" class="footer-col">
        <ul>
            <li class="email">
                <svg fill="#FFFFFF" height="48" viewBox="0 0 24 24" width="48" xmlns="http://www.w3.org/2000/svg" class="icon">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    <path d="M0 0h24v24H0z" fill="none"/>
                </svg>
                <a href='mailto&#58;hel%6C%6F&#64;&#107;&#97;%65nga&#46;&#99;&#111;%6D'>he&#108;lo&#64;kaen&#103;a&#46;com</a>
            </li>
            <li class="call">
                <svg fill="#FFFFFF" height="48" viewBox="0 0 24 24" width="48" xmlns="http://www.w3.org/2000/svg" class="icon">
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M22 3H2C.9 3 0 3.9 0 5v14c0 1.1.9 2 2 2h20c1.1 0 1.99-.9 1.99-2L24 5c0-1.1-.9-2-2-2zM8 6c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H2v-1c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1zm3.85-4h1.64L21 16l-1.99 1.99c-1.31-.98-2.28-2.38-2.73-3.99-.18-.64-.28-1.31-.28-2s.1-1.36.28-2c.45-1.62 1.42-3.01 2.73-3.99L21 8l-1.51 2h-1.64c-.22.63-.35 1.3-.35 2s.13 1.37.35 2z"/>
                </svg>
                <a href="callto:+64220772329">022 077 2329</a>
            </li>
        </ul>
    </div>


    <div id="TopLevelMenu" class="footer-col">
        <ul>
    <% loop Menu(1) %>
            <li><a href="$Link" class="$LinkingMode">$MenuTitle</a></li>
    <% end_loop %>
        </ul>
    </div>

    <div id="FooterRecentlyUpdated" class="footer-col">
        <p>Recently Updated</p>
        <ul>
    <% loop $RecentlyUpdated %>
            <li><a href="$Link" class="$LinkingMode">$MenuTitle</a></li>
    <% end_loop %>
        </ul>

        <% if $InThisSection %>
        <p>In this section</p>
        <ul>
            <% loop $InThisSection %>
            <li><a href="$Link" class="$LinkingMode">$MenuTitle</a></li>
            <% end_loop %>
        </ul>
        <% end_if %>

        <% if $AlsoSee %>
        <p>Also see ...</p>
        <ul>
            <% loop $AlsoSee %>
            <li><a href="$Link" class="$LinkingMode">$MenuTitle</a></li>
            <% end_loop %>
        </ul>
        <% end_if %>

    </div>




    <div id="FooterCopyrightMessage">$SiteConfig.CopyrightNotice</div><br />

</footer>
