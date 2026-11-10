import React, { useState } from 'react';
import { PhotoStory, CuratedReview } from '../data/photoStories';
import { X, ChevronLeft, ChevronRight, Star, MessageSquare, MapPin, Camera, User, CheckCircle, Send, Sparkles } from 'lucide-react';

interface PhotoGalleryModalProps {
  story: PhotoStory | null;
  onClose: () => void;
}

export const PhotoGalleryModal: React.FC<PhotoGalleryModalProps> = ({ story, onClose }) => {
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [reviewsList, setReviewsList] = useState<CuratedReview[]>([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newDishOrActivity, setNewDishOrActivity] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newTip, setNewTip] = useState('');

  // Sync reviews when story changes
  React.useEffect(() => {
    if (story) {
      setReviewsList(story.reviews || []);
      setActivePhotoIdx(0);
      setShowReviewForm(false);
    }
  }, [story]);

  if (!story) return null;

  const allReviews = reviewsList.length > 0 ? reviewsList : (story.reviews || []);
  const currentPhoto = story.gallery[activePhotoIdx] || story.gallery[0];

  const handlePrevPhoto = () => {
    setActivePhotoIdx((prev) => (prev > 0 ? prev - 1 : story.gallery.length - 1));
  };

  const handleNextPhoto = () => {
    setActivePhotoIdx((prev) => (prev < story.gallery.length - 1 ? prev + 1 : 0));
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const newRev: CuratedReview = {
      author: `${newAuthor.trim()} (Community Contributor)`,
      rating: newRating,
      date: 'Just now',
      quote: newComment.trim(),
      verifiedTip: newTip.trim() || 'Recommended by a local explorer.',
      dishOrActivity: newDishOrActivity.trim() || story.activityOrTheme
    };

    setReviewsList((prev) => [newRev, ...prev]);
    setNewAuthor('');
    setNewComment('');
    setNewTip('');
    setNewDishOrActivity('');
    setShowReviewForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-5xl bg-[#FBF9F5] border border-[#E8E4DC] rounded-[4px] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="p-4 bg-white border-b border-[#E8E4DC] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-mono uppercase font-bold text-[#0F382A] bg-[#E2ECE6] px-2.5 py-1 rounded-[3px]">
              {story.neighborhood}
            </span>
            <span className="text-[#5A6C64] font-medium hidden sm:inline">·</span>
            <span className="text-[#5A6C64] hidden sm:inline">{story.activityOrTheme}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#F5F3EF] text-[#5A6C64] hover:text-[#1B2421] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-7 space-y-7">
          {/* Main Customer Reviews Carousel Stage */}
          <div className="space-y-3">
            <div className="relative w-full bg-gradient-to-br from-[#FAF8F3] via-[#F4EDE0] to-[#EAE0CD] border border-[#DDD5C5] rounded-[4px] p-6 sm:p-8 shadow-xs min-h-[220px] flex flex-col justify-between">
              {/* Background decorative quote watermark */}
              <span
                aria-hidden="true"
                className="absolute -top-6 left-6 text-9xl font-serif text-[#0F382A]/10 pointer-events-none select-none font-bold"
              >
                “
              </span>

              {/* Top Row: Review index & Tag */}
              <div className="relative z-10 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <div className="flex text-[#F5A623]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className="text-sm">★</span>
                    ))}
                  </div>
                  <span className="text-xs font-mono font-bold text-[#1B2421]">5.0</span>
                  <span className="text-[10px] uppercase font-semibold text-[#0F382A] bg-[#E2ECE6] px-2 py-0.5 rounded-full border border-[#C1ECD7]">
                    Verified Customer Voice
                  </span>
                </div>

                <span className="text-xs font-mono text-[#5A6C64] bg-white/80 px-2.5 py-1 rounded border border-[#DDD5C5]">
                  Review {activePhotoIdx + 1} of {allReviews.length}
                </span>
              </div>

              {/* Review Quote */}
              <div className="relative z-10 my-4">
                <blockquote className="font-serif text-lg sm:text-xl italic text-[#0F382A] leading-snug">
                  “{allReviews[activePhotoIdx]?.quote || allReviews[0]?.quote}”
                </blockquote>

                {allReviews[activePhotoIdx]?.dishOrActivity && (
                  <p className="mt-2 text-xs font-medium text-[#891D00]">
                    Customer Recommended Order: <strong>{allReviews[activePhotoIdx].dishOrActivity}</strong>
                  </p>
                )}
              </div>

              {/* Bottom Customer Info & Carousel Controls */}
              <div className="relative z-10 pt-3 border-t border-[#DDD5C5] flex items-center justify-between gap-3 text-xs">
                <div>
                  <p className="font-semibold text-[#1B2421]">
                    {allReviews[activePhotoIdx]?.author || allReviews[0]?.author}
                  </p>
                  <p className="text-[10px] text-[#5A6C64]">
                    {allReviews[activePhotoIdx]?.date || allReviews[0]?.date} · {story.neighborhood}
                  </p>
                </div>

                {/* Previous / Next Review Switchers */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setActivePhotoIdx((prev) => (prev > 0 ? prev - 1 : allReviews.length - 1))}
                    className="p-1.5 rounded bg-white border border-[#DDD5C5] hover:bg-[#0F382A] hover:text-white transition-colors cursor-pointer text-xs font-semibold"
                    title="Previous review"
                  >
                    ← Prev
                  </button>
                  <button
                    onClick={() => setActivePhotoIdx((prev) => (prev < allReviews.length - 1 ? prev + 1 : 0))}
                    className="p-1.5 rounded bg-[#0F382A] text-white hover:bg-[#1B2421] transition-colors cursor-pointer text-xs font-semibold"
                    title="Next review"
                  >
                    Next Review →
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Customer Testimonial Selector Strip */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {allReviews.map((rev, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePhotoIdx(idx)}
                  className={`px-3 py-1.5 rounded-[3px] border text-xs font-medium shrink-0 transition-all cursor-pointer ${
                    activePhotoIdx === idx
                      ? 'bg-[#0F382A] text-white border-[#0F382A] shadow-2xs'
                      : 'bg-white border-[#E8E4DC] text-[#414844] hover:bg-[#F5F3EF]'
                  }`}
                >
                  <span className="font-semibold">{rev.author.split(' ')[0]}</span> · ★ 5.0
                </button>
              ))}
            </div>
          </div>

          {/* Story Narrative & Highlights */}
          <div className="space-y-3 bg-white p-5 rounded-[4px] border border-[#E8E4DC]">
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1B2421]">
              {story.title}
            </h2>
            <p className="text-sm text-[#414844] leading-relaxed">
              {story.summary}
            </p>
            <div className="pt-3 border-t border-[#E8E4DC] flex flex-wrap items-center justify-between gap-2 text-xs text-[#5A6C64]">
              <span className="font-mono">
                Curated Visual Dispatch · {story.photographer}
              </span>
              <span className="font-semibold text-[#0F382A]">
                Activity: {story.activityOrTheme}
              </span>
            </div>
          </div>

          {/* Visitor Reviews & Local Recommendations Section */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#0F382A] font-semibold">
                  <Star className="w-4 h-4 fill-[#F5A623] text-[#F5A623]" />
                  <span>Verified Visitor Reviews & Local Dining Tips</span>
                </div>
                <h3 className="font-serif text-xl font-semibold text-[#1B2421]">
                  Community Experiences ({reviewsList.length})
                </h3>
              </div>

              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="px-4 py-2 bg-[#0F382A] text-white text-xs font-semibold rounded-[4px] hover:bg-[#1B2421] transition-all cursor-pointer flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{showReviewForm ? 'Close Form' : '+ Share Your Review / Food Tip'}</span>
              </button>
            </div>

            {/* Interactive Add Review Form */}
            {showReviewForm && (
              <form onSubmit={handleAddReview} className="p-5 bg-white border border-[#E8E4DC] rounded-[4px] space-y-4 shadow-xs">
                <h4 className="font-serif text-base font-semibold text-[#0F382A]">
                  Leave Your Field Note or Food Tip
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block text-[#5A6C64] mb-1 font-medium">Your Name / Handle:</label>
                    <input
                      type="text"
                      placeholder="e.g. Keith L. (Khatib Local)"
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      className="w-full p-2 bg-[#FBF9F5] border border-[#E8E4DC] rounded-[4px]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[#5A6C64] mb-1 font-medium">Dish / Activity Visited:</label>
                    <input
                      type="text"
                      placeholder="e.g. Chong Pang Nasi Lemak + Wings"
                      value={newDishOrActivity}
                      onChange={(e) => setNewDishOrActivity(e.target.value)}
                      className="w-full p-2 bg-[#FBF9F5] border border-[#E8E4DC] rounded-[4px]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#5A6C64] mb-1 font-medium">Rating (1 to 5 Stars):</label>
                    <select
                      value={newRating}
                      onChange={(e) => setNewRating(Number(e.target.value))}
                      className="w-full p-2 bg-[#FBF9F5] border border-[#E8E4DC] rounded-[4px]"
                    >
                      <option value={5}>★★★★★ (5 - Exceptional)</option>
                      <option value={4}>★★★★☆ (4 - Great)</option>
                      <option value={3}>★★★☆☆ (3 - Good)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <label className="block text-[#5A6C64] font-medium">Your Experience / Review:</label>
                  <textarea
                    rows={2}
                    placeholder="Share what makes this place special, taste of the food, atmosphere, queue times..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full p-2 bg-[#FBF9F5] border border-[#E8E4DC] rounded-[4px]"
                    required
                  />
                </div>

                <div className="space-y-2 text-xs">
                  <label className="block text-[#5A6C64] font-medium">Pro-Tip for Future Visitors (Optional):</label>
                  <input
                    type="text"
                    placeholder="e.g. Arrive before 11:30 AM to avoid the lunch rush, ask for extra sambal..."
                    value={newTip}
                    onChange={(e) => setNewTip(e.target.value)}
                    className="w-full p-2 bg-[#FBF9F5] border border-[#E8E4DC] rounded-[4px]"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="px-4 py-2 text-xs text-[#5A6C64] hover:text-[#1B2421]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#0F382A] text-white text-xs font-semibold rounded-[4px] hover:bg-[#1B2421] flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Review</span>
                  </button>
                </div>
              </form>
            )}

            {/* Reviews List */}
            <div className="space-y-3">
              {reviewsList.map((rev, rIdx) => (
                <div key={rIdx} className="p-4 bg-white border border-[#E8E4DC] rounded-[4px] space-y-2 shadow-2xs">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#E2ECE6] text-[#0F382A] flex items-center justify-center font-bold text-xs">
                        {rev.author.charAt(0)}
                      </div>
                      <div>
                        <span className="font-semibold text-xs text-[#1B2421] block">
                          {rev.author}
                        </span>
                        {rev.dishOrActivity && (
                          <span className="text-[11px] text-[#F26440] font-medium">
                            Visited for: {rev.dishOrActivity}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center text-[#F5A623]">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="text-[11px] font-mono text-[#5A6C64]">{rev.date}</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#414844] leading-relaxed">
                    "{rev.quote}"
                  </p>

                  {rev.verifiedTip && (
                    <div className="p-2.5 bg-[#FBF9F5] border border-[#E8E4DC] rounded-[3px] text-xs text-[#0F382A]">
                      <strong className="text-[11px] uppercase tracking-wider block text-[#0F382A]">
                        Insider Visitor Tip:
                      </strong>
                      <span className="text-[#414844]">{rev.verifiedTip}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-white border-t border-[#E8E4DC] flex items-center justify-between text-xs text-[#5A6C64]">
          <span className="font-mono text-[11px]">
            Community verified reviews · Botanical Voyage Singapore
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 font-semibold text-[#0F382A] hover:text-[#1B2421] cursor-pointer"
          >
            Close Gallery
          </button>
        </div>
      </div>
    </div>
  );
};
