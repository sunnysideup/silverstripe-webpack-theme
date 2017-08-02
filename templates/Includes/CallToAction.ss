<% if $LargeImage %>
<figure class="large-image">

    <% if LargeText %>
    <figcaption>
        $LargeText
    </figcaption>
    <% end_if %>

    <% if $CallToActionLink %><a href="$CallToActionLink.Link" class="button">$CallToAction</a><% end_if %>

</figure>
<% else %>
<div class="empty-space">&nbsp;</div>
<% end_if %>
