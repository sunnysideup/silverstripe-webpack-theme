<div class="$NumberOfColumns" id="MainDetails">

    <main>
        <div class="typography content-padding">
            <div id="MainContentSection">
                <h1 id="PageTitle">$Title</h1>
                $Content
            </div>
            <% include FormSection %>
            <% include PageCommentSection %>
        </div>
    </main>

    <% if $hasSideBar %>
    <aside id="Sidebar" >
        <div class="typography content-padding">
            <% include Sidebar %>
            <% if $MySidebarImage %>
                <div id="MySidebarImage">
                    <img src="$MySidebarImage.Link" alt="$MySidebarImage.Title" />
                </div>
            <% end_if %>
        </div>
    </aside>
    <% end_if %>



    <% if $SecondColumn %>
    <section id="SecondColumn">
        <div class="typography content-padding">
            $SecondColumn
        </div>
    </section>
    <% end_if %>

</div>
