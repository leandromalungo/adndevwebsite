"use client";

import { useState } from "react";
import Image from "next/image";
import { MessageSquare, Heart, CornerDownRight, Send, Loader2, UserCheck, AlertCircle } from "lucide-react";
import { type StartupComment } from "@/lib/startup-types";

interface StartupCommentsProps {
  startupId: string;
  initialComments: StartupComment[];
  isLoggedIn: boolean;
  currentUser?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    username?: string | null;
  } | null;
  onRequireAuth: () => void;
}

export function StartupComments({
  startupId,
  initialComments,
  isLoggedIn,
  currentUser,
  onRequireAuth,
}: StartupCommentsProps) {
  const [comments, setComments] = useState<StartupComment[]>(initialComments);
  const [newCommentText, setNewCommentText] = useState("");
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const formatCommentDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return new Intl.DateTimeFormat("pt-PT", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(date);
    } catch {
      return "Recentemente";
    }
  };

  const handleSubmitComment = async (e: React.FormEvent, parentId: string | null = null) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!isLoggedIn) {
      onRequireAuth();
      return;
    }

    const content = parentId ? replyText.trim() : newCommentText.trim();
    if (!content) return;

    if (content.length < 2) {
      setErrorMessage("O comentário deve ter pelo menos 2 caracteres.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/startups/${startupId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          parentId,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Erro ao publicar comentário.");
      }

      const created: StartupComment = data.comment;

      if (parentId) {
        // Add to nested reply in state
        setComments((prev) =>
          prev.map((c) => {
            if (c.id === parentId) {
              return {
                ...c,
                replies: [...(c.replies || []), created],
              };
            }
            return c;
          })
        );
        setReplyText("");
        setReplyingToId(null);
      } else {
        // Add to root
        setComments((prev) => [created, ...prev]);
        setNewCommentText("");
      }

      setSuccessMessage("Comentário publicado com sucesso!");
      setTimeout(() => setSuccessMessage(""), 3500);
    } catch (err: any) {
      setErrorMessage(err.message || "Não foi possível enviar o comentário.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleLike = async (commentId: string) => {
    if (!isLoggedIn) {
      onRequireAuth();
      return;
    }

    // Update in state optimistically
    const updateLikesInTree = (list: StartupComment[]): StartupComment[] => {
      return list.map((item) => {
        if (item.id === commentId) {
          const wasLiked = Boolean(item.userHasLiked);
          return {
            ...item,
            userHasLiked: !wasLiked,
            likes_count: wasLiked ? Math.max(0, item.likes_count - 1) : item.likes_count + 1,
          };
        }
        if (item.replies && item.replies.length > 0) {
          return {
            ...item,
            replies: updateLikesInTree(item.replies),
          };
        }
        return item;
      });
    };

    setComments((prev) => updateLikesInTree(prev));

    try {
      const res = await fetch(`/api/startups/comments/${commentId}/like`, {
        method: "POST",
      });
      if (!res.ok) {
        throw new Error("Erro ao registar apoio");
      }
    } catch {
      // Revert if needed
    }
  };

  return (
    <section id="comentarios" className="rounded-xl border border-gray-200/90 bg-white p-6 sm:p-8">
      <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
        <div className="flex items-center gap-2.5">
          <MessageSquare className="w-5 h-5 text-violet-700" />
          <h3 className="text-lg font-bold text-gray-900">
            Discussão & Opiniões da Comunidade
          </h3>
          <span className="text-xs font-semibold text-gray-500 font-mono tabular-nums">
            ({comments.reduce((acc, c) => acc + 1 + (c.replies?.length || 0), 0)})
          </span>
        </div>
      </div>

      {/* Caixa de Entrada de Novo Comentário Principal */}
      <form onSubmit={(e) => handleSubmitComment(e, null)} className="mb-8">
        <div className="flex gap-3">
          <div className="shrink-0">
            {isLoggedIn && currentUser?.image ? (
              <img
                src={currentUser.image}
                alt="Avatar"
                className="w-10 h-10 rounded-full object-cover border border-gray-200"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-violet-100 text-violet-700 font-bold flex items-center justify-center text-sm border border-violet-200">
                {isLoggedIn ? (currentUser?.name || "U").slice(0, 2).toUpperCase() : "?"}
              </div>
            )}
          </div>

          <div className="flex-1">
            <textarea
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              placeholder={
                isLoggedIn
                  ? "Partilhe a sua experiência com esta startup, feedback construtivo ou faça uma pergunta aos fundadores..."
                  : "Inicie sessão na ADN Developer para comentar e conversar com os fundadores..."
              }
              rows={3}
              maxLength={1200}
              className="w-full rounded-xl border border-gray-200 p-3.5 text-sm text-gray-800 placeholder-gray-400 focus:border-violet-600 focus:outline-none focus:ring-1 focus:ring-violet-600 transition-colors"
            />

            <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-gray-400 font-mono tabular-nums">
                {newCommentText.length}/1200
              </span>

              <div className="flex items-center gap-2">
                {isLoggedIn ? (
                  <button
                    type="submit"
                    disabled={isSubmitting || newCommentText.trim().length < 2}
                    className="inline-flex items-center gap-2 rounded-lg bg-violet-700 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-violet-800 disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Send className="h-3.5 w-3.5" />
                    )}
                    <span>Publicar comentário</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={onRequireAuth}
                    className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-gray-800 cursor-pointer"
                  >
                    <UserCheck className="h-3.5 w-3.5" />
                    <span>Entrar para comentar</span>
                  </button>
                )}
              </div>
            </div>

            {errorMessage && (
              <div className="mt-3 flex items-center gap-2 rounded-lg bg-red-50 p-2.5 text-xs text-red-700 border border-red-200">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div className="mt-3 flex items-center gap-2 rounded-lg bg-emerald-50 p-2.5 text-xs text-emerald-700 border border-emerald-200">
                <UserCheck className="w-4 h-4 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}
          </div>
        </div>
      </form>

      {/* Lista de Comentários Threaded */}
      <div className="space-y-6">
        {comments.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-200 p-8 text-center">
            <MessageSquare className="mx-auto h-8 w-8 text-gray-300 mb-2" />
            <p className="text-sm font-semibold text-gray-700">
              Ainda não existem comentários sobre esta startup.
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Seja o primeiro a deixar a sua opinião ou questão para os fundadores!
            </p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="space-y-3">
              {/* Comentário Raiz */}
              <div className="flex gap-3">
                <div className="shrink-0">
                  {comment.user_avatar ? (
                    <img
                      src={comment.user_avatar}
                      alt={comment.user_name}
                      className="w-9 h-9 rounded-full object-cover border border-gray-100"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-violet-100 text-violet-800 font-bold flex items-center justify-center text-xs">
                      {comment.user_name.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>

                <div className="flex-1 rounded-xl bg-gray-50/70 p-4 border border-gray-100">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-sm font-bold text-gray-900">
                      {comment.user_name}
                    </span>
                    <span className="text-[11px] text-gray-400 font-medium">
                      {formatCommentDate(comment.created_at)}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                    {comment.content}
                  </p>

                  <div className="mt-3 flex items-center gap-4 text-xs">
                    <button
                      type="button"
                      onClick={() => handleToggleLike(comment.id)}
                      className={`inline-flex items-center gap-1.5 font-medium transition-colors cursor-pointer ${
                        comment.userHasLiked
                          ? "text-rose-600 font-bold"
                          : "text-gray-500 hover:text-rose-600"
                      }`}
                      title={isLoggedIn ? "Apoiar comentário" : "Inicie sessão para apoiar"}
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          comment.userHasLiked ? "fill-current text-rose-600" : ""
                        }`}
                      />
                      <span className="font-mono tabular-nums">{comment.likes_count}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (!isLoggedIn) {
                          onRequireAuth();
                        } else {
                          setReplyingToId(replyingToId === comment.id ? null : comment.id);
                        }
                      }}
                      className="inline-flex items-center gap-1 font-medium text-gray-500 hover:text-violet-700 transition-colors cursor-pointer"
                    >
                      <CornerDownRight className="w-3.5 h-3.5" />
                      <span>Responder</span>
                    </button>
                  </div>

                  {/* Formulário de Resposta Aninhada */}
                  {replyingToId === comment.id && (
                    <form
                      onSubmit={(e) => handleSubmitComment(e, comment.id)}
                      className="mt-3 pt-3 border-t border-gray-200/60"
                    >
                      <div className="flex gap-2">
                        <textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder={`Responder a ${comment.user_name}...`}
                          rows={2}
                          maxLength={1000}
                          className="w-full rounded-lg border border-gray-300 p-2.5 text-xs text-gray-800 placeholder-gray-400 focus:border-violet-600 focus:outline-none"
                          autoFocus
                        />
                        <button
                          type="submit"
                          disabled={isSubmitting || replyText.trim().length < 2}
                          className="self-end px-3 py-2 rounded-lg bg-violet-700 hover:bg-violet-800 text-white text-xs font-semibold disabled:opacity-50 transition-colors cursor-pointer"
                        >
                          {isSubmitting ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Send className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>

              {/* Respostas Aninhadas (Replies) */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="ml-10 pl-3 border-l-2 border-violet-100 space-y-2.5">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="flex gap-2.5">
                      <div className="shrink-0">
                        {reply.user_avatar ? (
                          <img
                            src={reply.user_avatar}
                            alt={reply.user_name}
                            className="w-7 h-7 rounded-full object-cover border border-gray-100"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="w-7 h-7 rounded-full bg-violet-100 text-violet-800 font-bold flex items-center justify-center text-[10px]">
                            {reply.user_name.slice(0, 2).toUpperCase()}
                          </div>
                        )}
                      </div>

                      <div className="flex-1 rounded-lg bg-gray-50/50 p-3 border border-gray-100">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-xs font-bold text-gray-900">
                            {reply.user_name}
                          </span>
                          <span className="text-[10px] text-gray-400">
                            {formatCommentDate(reply.created_at)}
                          </span>
                        </div>

                        <p className="text-xs text-gray-700 whitespace-pre-line leading-relaxed">
                          {reply.content}
                        </p>

                        <div className="mt-2 flex items-center gap-3 text-xs">
                          <button
                            type="button"
                            onClick={() => handleToggleLike(reply.id)}
                            className={`inline-flex items-center gap-1 font-medium transition-colors cursor-pointer ${
                              reply.userHasLiked
                                ? "text-rose-600 font-bold"
                                : "text-gray-400 hover:text-rose-600"
                            }`}
                          >
                            <Heart
                              className={`w-3 h-3 ${
                                reply.userHasLiked ? "fill-current text-rose-600" : ""
                              }`}
                            />
                            <span className="font-mono tabular-nums text-[11px]">
                              {reply.likes_count}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
}
