<main id="Page_Results" class="main-section content-container with-sidebar">
    <div  class="typography content-padding">
        <h1 id="PageTitle">Search Results</h1>
    <% if Results %>
        <div id="Content">
            <% if Results.MoreThanOnePage %>
                <div class="pageNumbers topPageNumbers">
                    <span class="numberOfPages">Page $Results.CurrentPage of $Results.TotalPages</span>
                    <span class="pageNumbers">
                        Go to page:
                    <% loop Results.Pages %>
                                <% if CurrentBool %>$PageNum<% else %><a href="$Link" title="View page number $PageNum">$PageNum</a><% end_if %>
                        <% end_loop %>
                    </span>
                </div>
            <% end_if %>

            <ul id="SearchResults">
                <% loop Results %>
                    <li class="$EvenOdd">
                        <h3><a href="$Link">$Title</a></h3>
                        <p>$Content.Summary</p>
                    </li>
                <% end_loop %>
            </ul>

            <% if Results.MoreThanOnePage %>
                <div class="pageNumbers bottomPageNumbers">
                    <span class="numberOfPages">Page $Results.CurrentPage of $Results.TotalPages</span>
                    <span  class="pageNumbers">
                        Go to page:
                    <% loop Results.Pages %>
                                <% if CurrentBool %>$PageNum<% else %><a href="$Link" title="View page number $PageNum ">$PageNum</a><% end_if %>
                        <% end_loop %>
                    </span>
                </div>
            <% end_if %>
        </div>
    <% else %>
        <p id="NoSearchResults">Sorry, no results were found, please try a different keyword phrase.</p>
    <% end_if %>
    </div>
</main>

<aside>
    <div id="Sidebar" class="typography content-padding">
        <div class="sidebarTop"></div>
        <% include Sidebar %>
        <div class="sidebarBottom"></div>
    </div>
</aside>
