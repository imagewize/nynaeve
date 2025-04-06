@if (! post_password_required())
  <section id="comments" class="comments my-8">
    @if ($responses)
      <h2 class="text-xl font-bold mb-4">
        {!! $title !!}
      </h2>

      <ol class="comment-list my-6 space-y-4">
        {!! $responses !!}
      </ol>

      @if ($paginated)
        <nav aria-label="Comment" class="my-4">
          <ul class="pager flex justify-between">
            @if ($previous)
              <li class="previous">
                {!! $previous !!}
              </li>
            @endif

            @if ($next)
              <li class="next">
                {!! $next !!}
              </li>
            @endif
          </ul>
        </nav>
      @endif
    @endif

    @if ($closed)
      <div class="comments-closed bg-gray-50 p-6 rounded-lg border border-gray-200 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mx-auto mb-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <p class="text-gray-600">{!! __('Comments are closed for this post.', 'sage') !!}</p>
      </div>
    @elseif (isset($comments_open) && $comments_open)
      <div class="comment-form-wrapper bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-sm">
        @php
          comment_form([
            'comment_notes_before' => '<p class="comment-notes text-sm text-gray-600 mb-4">' . __('Your email address will not be published.', 'sage') . '</p>',
            'class_form' => 'comment-form space-y-4',
            'title_reply_before' => '<h3 class="text-lg font-semibold mb-4">',
            'title_reply_after' => '</h3>',
            'class_submit' => 'submit bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 shadow-sm transition-all duration-300',
          ]);
        @endphp
      </div>
    @else
      <!-- Debugging info -->
      <div class="bg-yellow-100 p-4 rounded-lg">
        <p>Debug: Comments may be disabled for this post type.</p>
      </div>
    @endif
  </section>
@endif
