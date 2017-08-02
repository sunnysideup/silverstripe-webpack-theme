<nav id="main-menu">
    <a href="#" class="close-menu">×</a>
    <ul id="Nav">
<% loop Menu(1) %>
        <li class="$FirstLast">
            <a href="$Link" class="$LinkingMode">$MenuTitle</a>
    <% if $isSection %>
        <% if Children %>
        <ul>
            <% loop Children %>
                <% if ShowInMenus %>
            <li class="$FirstLast">
                <a href="$Link" class="$LinkingMode">$MenuTitle</a>
                    <% if $isSection %>
                        <% if Children %>
                <ul>
                            <% loop Children %>
                                <% if ShowInMenus %>
                        <li class="$FirstLast">
                            <a href="$Link" class="$LinkingMode">$MenuTitle</a>
                        </li>
                                <% end_if %>
                            <% end_loop %>
                </ul>
                        <% end_if %>
                    <% end_if %>
            </li>
                <% end_if %>
            <% end_loop %>
        </ul>
        <% end_if %>
    <% end_if %>
        </li>
<% end_loop %>
    </ul>
</nav>
