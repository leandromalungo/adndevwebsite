"use client";

import React, { useState } from "react";
import { Plus, X, Edit2, Trash2, ExternalLink, Link as LinkIcon, User, Book, Brain, Briefcase, Award, Info, FolderGit2, Globe, Calendar } from "lucide-react";
import * as actions from "@/app/actions/profile.actions";
import { PREDEFINED_SOFT_SKILLS, UNIQUE_PREDEFINED_LANGUAGES } from "@/data/predefined-skills";

const UnifiedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-5 h-5 fill-current text-gray-800">
    <path d="M192 64C209.7 64 224 78.3 224 96L224 128L352 128C369.7 128 384 142.3 384 160C384 177.7 369.7 192 352 192L342.4 192L334 215.1C317.6 260.3 292.9 301.6 261.8 337.1C276 345.9 290.8 353.7 306.2 360.6L356.6 383L418.8 243C423.9 231.4 435.4 224 448 224C460.6 224 472.1 231.4 477.2 243L605.2 531C612.4 547.2 605.1 566.1 589 573.2C572.9 580.3 553.9 573.1 546.8 557L526.8 512L369.3 512L349.3 557C342.1 573.2 323.2 580.4 307.1 573.2C291 566 283.7 547.1 290.9 531L330.7 441.5L280.3 419.1C257.3 408.9 235.3 396.7 214.5 382.7C193.2 399.9 169.9 414.9 145 427.4L110.3 444.6C94.5 452.5 75.3 446.1 67.4 430.3C59.5 414.5 65.9 395.3 81.7 387.4L116.2 370.1C132.5 361.9 148 352.4 162.6 341.8C148.8 329.1 135.8 315.4 123.7 300.9L113.6 288.7C102.3 275.1 104.1 254.9 117.7 243.6C131.3 232.3 151.5 234.1 162.8 247.7L173 259.9C184.5 273.8 197.1 286.7 210.4 298.6C237.9 268.2 259.6 232.5 273.9 193.2L274.4 192L64.1 192C46.3 192 32 177.7 32 160C32 142.3 46.3 128 64 128L160 128L160 96C160 78.3 174.3 64 192 64zM448 334.8L397.7 448L498.3 448L448 334.8z"/>
  </svg>
);

// Função para formatar data ISO para formato legível
const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString + 'T00:00:00Z');
    return date.toLocaleDateString('pt-PT', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return dateString;
  }
};

const getPlatformIcon = (platform: string) => {
  switch(platform.toLowerCase()) {
    case 'linkedin':
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#0077B5"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
      );
    case 'github':
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#181717"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
      );
    case 'twitter':
    case 'x':
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#000"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L2.25 2.25h6.193l4.264 5.638L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/></svg>
      );
    case 'facebook':
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
      );
    case 'instagram':
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
          <defs>
            <linearGradient id="inst-grad" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#f09433"/>
              <stop offset="0.25" stopColor="#e6683c"/>
              <stop offset="0.5" stopColor="#dc2743"/>
              <stop offset="0.75" stopColor="#cc2366"/>
              <stop offset="1" stopColor="#bc1888"/>
            </linearGradient>
          </defs>
          <path fill="url(#inst-grad)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
</svg>
      );
    case 'reddit':
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#FF4500"><path d="M24 11.5c0-1.654-1.346-3-3-3-.672 0-1.29.223-1.791.599-2.091-1.523-4.946-2.529-8.117-2.664l1.393-6.562 4.544.965c.03 1.051.897 1.912 1.971 1.912 1.103 0 2-.897 2-2s-.897-2-2-2c-.93 0-1.711.642-1.928 1.514l-5.11-1.085c-.156-.033-.311.028-.409.16-.099.133-.122.304-.064.457l-1.555 7.332c-3.21.107-6.115 1.111-8.228 2.658-.501-.383-1.128-.614-1.81-.614-1.654 0-3 1.346-3 3 0 1.11.605 2.079 1.498 2.597-.065.299-.098.601-.098.903 0 3.86 5.383 7 12 7s12-3.14 12-7c0-.302-.033-.604-.098-.903.893-.518 1.498-1.487 1.498-2.597zm-18.5 2c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm11 5c-1.802 1.802-5.748 1.947-6.5 1.947-.752 0-4.698-.145-6.5-1.947-.195-.195-.195-.512 0-.707s.512-.195.707 0c1.353 1.353 4.451 1.654 5.793 1.654 1.343 0 4.441-.301 5.793-1.654.195-.195.512-.195.707 0s.195.512 0 .707zm-.5-2c-.828 0-1.5-.672-1.5-1.5s.672-1.5 1.5-1.5 1.5.672 1.5 1.5-.672 1.5-1.5 1.5z"/></svg>
      );
    default:
      return <LinkIcon className="w-4 h-4 text-gray-600" />;
  }
};

const getSocialUrl = (platform: string, username: string) => {
  const cleanUsername = username.trim().replace(/^@/, '');
  if (!cleanUsername) return '#';

  switch(platform.toLowerCase()) {
    case 'linkedin': return `https://linkedin.com/in/${cleanUsername}`;
    case 'github': return `https://github.com/${cleanUsername}`;
    case 'twitter':
    case 'x': return `https://x.com/${cleanUsername}`;
    case 'instagram': return `https://instagram.com/${cleanUsername}`;
    case 'facebook': return `https://facebook.com/${cleanUsername}`;
    case 'reddit': return `https://reddit.com/u/${cleanUsername}`;
    default: return '#';
  }
};

const ensureExternalLink = (url: string) => {
  if (!url) return "#";
  const trimmedUrl = url.trim();
  if (trimmedUrl.startsWith('http://') || trimmedUrl.startsWith('https://') || trimmedUrl.startsWith('mailto:') || trimmedUrl.startsWith('tel:')) {
    return trimmedUrl;
  }
  return `https://${trimmedUrl}`;
};

interface ProfileContentProps {
  initialData: any;
  userId: string;
  isReadOnly?: boolean;
}

export default function ProfileContent({ initialData, userId, isReadOnly = false }: ProfileContentProps) {
  const [name, setName] = useState(initialData.realName || "Nome do Utilizador");
  const [bio, setBio] = useState(initialData.profile?.bio || "");
  
  const [socialLinks, setSocialLinks] = useState(initialData.socialLinks || []);
  const [hardSkills, setHardSkills] = useState(initialData.skills.filter((s: any) => s.type === 'hard').map((s: any) => s.name));
  const [softSkills, setSoftSkills] = useState(initialData.skills.filter((s: any) => s.type === 'soft').map((s: any) => s.name));
  const [languages, setLanguages] = useState(initialData.skills.filter((s: any) => s.type === 'language').map((s: any) => s.name));
  
  const [experiences, setExperiences] = useState(initialData.experiences || []);
  const [certifications, setCertifications] = useState(initialData.certifications || []);
  const [extraInfo, setExtraInfo] = useState(initialData.extraInfo || []);
  const [projects, setProjects] = useState(initialData.projects || []);

  // -------------------------------------------------------------
  // Funções de Persistência (Server Actions)
  // -------------------------------------------------------------

  const updateBio = async (newBio: string) => {
    await actions.updateProfileBio(userId, newBio);
    setBio(newBio);
  };

  const updateName = async (newName: string) => {
    await actions.updateUserName(userId, newName);
    setName(newName);
  };

  // Apenas mostrar abas com dados preenchidos no modo read-only
  const hasBio = isReadOnly ? !!bio?.trim() : true;
  const hasSocialLinks = isReadOnly ? socialLinks.length > 0 : true;
  const hasHardSkills = isReadOnly ? hardSkills.length > 0 : true;
  const hasSoftSkills = isReadOnly ? softSkills.length > 0 : true;
  const hasLanguages = isReadOnly ? languages.length > 0 : true;
  const hasExperiences = isReadOnly ? experiences.length > 0 : true;
  const hasCertifications = isReadOnly ? certifications.length > 0 : true;
  const hasExtraInfo = isReadOnly ? extraInfo.length > 0 : true;
  const hasProjects = isReadOnly ? projects.length > 0 : true;

  return (
    <div className="flex-1 w-full min-w-0 pb-10">
      <div className="border border-gray-200 rounded-md overflow-hidden bg-white mb-6 text-gray-800">
        <div className="border-b border-gray-200 bg-gray-50 px-4 py-2 flex items-center justify-between text-xs text-gray-500">
          <span>Portfólio / Currículo</span>
        </div>

        <div className="p-6 md:p-8 article-content">
          
          <div className="flex flex-col items-center mb-6 pb-2 border-b border-gray-200">
            <h2 className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Nome Completo</h2>
            <EditableTextField 
              value={name} 
              onSave={updateName} 
              className="text-lg sm:text-xl md:text-2xl text-center"
              isReadOnly={isReadOnly}
            />
          </div>

          {hasBio && (
            <>
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
                 <User className="w-5 h-5 text-gray-800" />
                 <h2 className="text-xl font-medium text-gray-800">Sobre mim</h2>
              </div>

              <EditableTextField 
                value={bio} 
                onSave={updateBio} 
                isTextArea={true}
                placeholder="Escreva algo sobre si..."
                className="mb-8 text-sm sm:text-base leading-relaxed"
                isReadOnly={isReadOnly}
              />
            </>
          )}

          {hasSocialLinks && (
            <EditableSocialLinks 
              title={
                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-gray-800" />
                    Contacte-me em
                  </div>
              }
              items={socialLinks}
              userId={userId}
              setItems={setSocialLinks}
              isReadOnly={isReadOnly}
            />
          )}

          {hasHardSkills && (
            <EditableTags 
              title={
                  <div className="flex items-center gap-2">
                    <Book className="w-5 h-5 text-gray-800" />
                    Hard Skills
                  </div>
              }
              tags={hardSkills} 
              onAdd={(tag: string) => actions.addSkill(userId, 'hard', tag)}
              onRemove={(tag: string) => {
                  const skillId = initialData.skills.find((s: any) => s.name === tag && s.type === 'hard')?.id;
                  if (skillId) actions.deleteSkill(userId, skillId);
              }}
              setTags={setHardSkills} 
              isReadOnly={isReadOnly}
              renderBadge={(tech: string, onRemove: () => void) => (
                <div key={tech} className="group relative flex items-center px-4 py-1.5 rounded text-xs tracking-wider bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-sm border border-gray-700 hover:border-violet-600 transition-colors cursor-default">
                  <span>{tech}</span>
                  {!isReadOnly && (
                    <button onClick={onRemove} className="absolute -top-1.5 -right-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              )}
            />
          )}

          {hasSoftSkills && (
            <EditableTagsWithPredefined 
              title={
                  <div className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-gray-800" />
                    Soft Skills
                  </div>
              }
              tags={softSkills} 
              onAdd={(tag: string) => actions.addSkill(userId, 'soft', tag)}
              onRemove={(tag: string) => {
                  const skillId = initialData.skills.find((s: any) => s.name === tag && s.type === 'soft')?.id;
                  if (skillId) actions.deleteSkill(userId, skillId);
              }}
              setTags={setSoftSkills}
              predefinedOptions={PREDEFINED_SOFT_SKILLS}
              isReadOnly={isReadOnly}
              badgeClassName="bg-indigo-50 text-indigo-700 border-indigo-100 hover:bg-indigo-100"
            />
          )}

          {hasLanguages && (
            <EditableTagsWithPredefined 
              title={
                  <div className="flex items-center gap-2">
                    <UnifiedIcon />
                    Idiomas Falados
                  </div>
              }
              tags={languages} 
              onAdd={(tag: string) => actions.addSkill(userId, 'language', tag)}
              onRemove={(tag: string) => {
                  const skillId = initialData.skills.find((s: any) => s.name === tag && s.type === 'language')?.id;
                  if (skillId) actions.deleteSkill(userId, skillId);
              }}
              setTags={setLanguages}
              predefinedOptions={UNIQUE_PREDEFINED_LANGUAGES}
              isReadOnly={isReadOnly}
              badgeClassName="bg-indigo-50 text-indigo-700 border-indigo-100 hover:bg-indigo-100"
            />
          )}

          {hasCertifications && (
            <EditableCertificationList 
              title={
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-gray-800" />
                    Certificações
                  </div>
              }
              items={certifications}
              userId={userId}
              setItems={setCertifications}
              isReadOnly={isReadOnly}
            />
          )}

          {hasExtraInfo && (
            <EditableExperienceList 
              title={
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-gray-800" />
                    Experiência de Trabalho
                  </div>
              }
              items={extraInfo}
              userId={userId}
              setItems={setExtraInfo}
              isReadOnly={isReadOnly}
            />
          )}

        </div>
      </div>

      {hasProjects && (
        <EditableProjectsList 
          title={
              <div className="flex items-center gap-3">
                <FolderGit2 className="w-5 h-5 text-gray-800" />
                Projectos
              </div>
          }
          items={projects}
          userId={userId}
          setItems={setProjects}
          isReadOnly={isReadOnly}
        />
      )}
    </div>
  );
}

// -------------------------------------------------------------
// Componentes Auxiliares para Secções Editáveis
// -------------------------------------------------------------

function EditableTextField({ value, onSave, isTextArea = false, placeholder = "", className = "", isReadOnly = false }: any) {
  const [isEditing, setIsEditing] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!localValue.trim()) return;
    setLoading(true);
    try {
      await onSave(localValue);
      setIsEditing(false);
    } catch (err) {
      alert("Erro ao salvar.");
    } finally {
      setLoading(false);
    }
  };

  if (isEditing) {
    const maxLen = 400;
    return (
      <div className={`flex flex-col gap-2 w-full mb-8`}>
        {isTextArea ? (
          <div className="relative">
            <textarea placeholder={placeholder} value={localValue} autoFocus onKeyDown={(e) => {if(e.ctrlKey && e.key === 'Enter') handleSave()}} onChange={e => setLocalValue(e.target.value)} className="border border-gray-300 rounded-md p-3 text-sm w-full outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 resize-y pb-6" rows={5} maxLength={maxLen} />
            <span className={`absolute bottom-2 right-3 text-xs tabular-nums pointer-events-none ${ localValue.length > maxLen * 0.9 ? 'text-orange-500 font-semibold' : 'text-gray-400' }`}>{localValue.length}/{maxLen}</span>
          </div>
        ) : (
          <div className="relative">
            <input type="text" placeholder={placeholder} value={localValue} autoFocus onKeyDown={(e) => e.key === 'Enter' && handleSave()} onChange={e => setLocalValue(e.target.value)} className="border border-gray-300 rounded-md p-2 text-xl sm:text-2xl font-medium w-full outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 text-center pr-20" maxLength={maxLen} />
            <span className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs tabular-nums pointer-events-none ${ localValue.length > maxLen * 0.9 ? 'text-orange-500 font-semibold' : 'text-gray-400' }`}>{localValue.length}/{maxLen}</span>
          </div>
        )}
        <div className="flex justify-end gap-2 text-sm text-gray-500 mt-1">
           {isTextArea && <span>Ctrl + Enter para gravar</span>}
           <button disabled={loading} onClick={() => setIsEditing(false)} className="px-4 py-1.5 font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Cancelar</button>
           <button disabled={loading} onClick={handleSave} className="px-4 py-1.5 font-medium bg-violet-600 text-white rounded-md hover:bg-violet-700 flex items-center gap-2">
             {loading && <div className="w-3 h-3 border-2 border-white border-t-transparent animate-spin rounded-full"></div>}
             Gravar
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative pr-10">
      <div className={className}>
        {value ? (isTextArea ? value.split('\n').filter((l: string) => l.trim()).map((l: string, i: number) => <p key={i}>{l}</p>) : value) : <span className="text-gray-400 italic">Nenhuma informação adicionada.</span>}
      </div>
      {!isReadOnly && (
        <button onClick={() => { setLocalValue(value); setIsEditing(true); }} className="absolute top-2 right-0 p-1.5 sm:opacity-0 group-hover:opacity-100 transition-opacity bg-white hover:bg-violet-50 text-violet-700 hover:text-violet-600 rounded-md shadow-sm border border-gray-200">
          <Edit2 className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

// --------------------------------------------------------------------------
// EditableSocialLinks: Gere e edite os links de redes sociais (GitHub, LinkedIn, etc.)
// --------------------------------------------------------------------------
function EditableSocialLinks({ title, items, userId, setItems, isReadOnly = false }: any) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ platform: '', username: '' });
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!formData.platform || !formData.username.trim()) return;
    setLoading(true);
    try {
      const payload = {
        platform: formData.platform,
        username: formData.username.trim(),
        url: getSocialUrl(formData.platform, formData.username)
      };

      if (editingId) {
        await actions.updateSocialLink(userId, editingId, payload);
        setItems(items.map((i: any) => i.id === editingId ? { ...payload, id: editingId } : i));
      } else {
        await actions.addSocialLink(userId, payload);
        // Page revalidates, but we can update local state for immediate feedback
        window.location.reload(); 
      }
      setIsAdding(false);
      setEditingId(null);
    } catch (err) {
      alert("Erro ao salvar link social.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await actions.deleteSocialLink(userId, id);
      setItems(items.filter((i: any) => i.id !== id));
    } catch (err) {
      alert("Erro ao remover.");
    }
  };

  const platformsList = ["LinkedIn", "GitHub", "Twitter", "Facebook", "Instagram", "Reddit"];

  return (
    <div className="mb-10 w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-lg">{title}</h3>
        {!isReadOnly && (
          <button onClick={() => { setFormData({platform:'', username:''}); setEditingId(null); setIsAdding(true); }} className="p-1.5 hover:bg-gray-100 rounded-md text-gray-500 transition-colors">
            <Plus className="w-5 h-5" />
          </button>
        )}
      </div>

      {isAdding && (
        <div className="border border-violet-700 bg-violet-50/50 p-4 rounded-lg mb-4 flex flex-col sm:flex-row gap-3">
          <select value={formData.platform} onChange={e => setFormData({...formData, platform: e.target.value})} className="border border-gray-300 rounded px-3 py-2 text-sm flex-1 outline-none focus:border-violet-500 bg-white">
             <option value="">Rede</option>
             {platformsList.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          <input type="text" placeholder="Nome de utilizador" value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} className="border border-gray-300 rounded px-3 py-2 text-sm flex-1 outline-none focus:border-violet-500" maxLength={100} />
          <div className="flex gap-2 justify-end mt-2 sm:mt-0">
            <button disabled={loading} onClick={() => setIsAdding(false)} className="px-3 py-1.5 rounded-md text-sm font-medium text-gray-600 bg-white border border-gray-300 hover:bg-gray-50">Sair</button>
            <button disabled={loading || !formData.platform || !formData.username.trim()} onClick={handleSave} className="px-3 py-1.5 rounded-md text-sm font-medium bg-violet-700 text-white hover:bg-violet-600 disabled:opacity-50 disabled:cursor-not-allowed">OK</button>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        {items.map((item: any) => (
          <div key={item.id} className="group relative">
            <a href={ensureExternalLink(item.url)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white hover:border-gray-600 transition-all text-sm font-medium text-gray-700 pr-12">
              {getPlatformIcon(item.platform)}
              <span className="text-gray-500 group-hover:text-gray-900 transition-colors">{item.username}</span>
            </a>
            {!isReadOnly && (
              <div className="absolute top-1 right-1 flex gap-0.5 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={(e) => { e.preventDefault(); setEditingId(item.id); setFormData({platform: item.platform, username: item.username}); setIsAdding(true); }} className="p-1 text-gray-400 hover:text-violet-600 hover:bg-violet-50 rounded-md bg-white border border-gray-100">
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button onClick={(e) => { e.preventDefault(); handleDelete(item.id); }} className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md bg-white border border-gray-100">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// EditableTagsWithPredefined: Edite tags com opções pré-definidas (dropdown)
// --------------------------------------------------------------------------
function EditableTagsWithPredefined({ title, tags, onAdd, onRemove, setTags, predefinedOptions, badgeClassName = "bg-gray-50 text-gray-700 border-gray-200", renderBadge, isReadOnly = false }: any) {
  const [isAdding, setIsAdding] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredOptions = predefinedOptions.filter((option: string) => 
    !tags.includes(option) && 
    option.toLowerCase().includes(newTag.toLowerCase())
  );

  const handleAdd = async (tagToAdd: string) => {
    if (tagToAdd.trim() && !tags.includes(tagToAdd.trim())) {
      setLoading(true);
      try {
        await onAdd(tagToAdd.trim());
        setTags([...tags, tagToAdd.trim()]);
        setNewTag("");
        setIsAdding(false);
        setShowDropdown(false);
        window.location.reload();
      } catch (err) {
        alert("Erro ao adicionar.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleRemove = async (tag: string) => {
      try {
          await onRemove(tag);
          setTags(tags.filter((t: string) => t !== tag));
      } catch (err) {
          alert("Erro ao remover.");
      }
  };

  return (
    <div className="mb-10 w-full">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200">
        <h2 className="text-xl font-medium">{title}</h2>
        {!isReadOnly && (
          <button onClick={() => { setIsAdding(!isAdding); setShowDropdown(false); }} className="p-1.5 hover:bg-gray-100 rounded-md text-gray-500 transition-colors">
            <Plus className="w-5 h-5" />
          </button>
        )}
      </div>

      {isAdding && (
        <div className="flex flex-col gap-2 mb-4 w-full relative">
          <div className="relative flex-1">
            <input 
              type="text" 
              value={newTag} 
              onChange={(e) => {
                setNewTag(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              disabled={loading}
              className="border border-gray-300 rounded-md px-3 py-1.5 text-sm w-full outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
              placeholder="Procurar ou digitar novo..."
              onKeyDown={(e) => {
                if (e.key === 'Enter' && newTag.trim()) {
                  handleAdd(newTag.trim());
                }
              }}
              autoFocus
              maxLength={100}
            />
            
            {showDropdown && filteredOptions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-48 overflow-y-auto">
                {filteredOptions.map((option: string) => (
                  <button
                    key={option}
                    onClick={() => handleAdd(option)}
                    className="w-full text-left px-3 py-2 hover:bg-violet-50 text-sm border-b border-gray-100 last:border-b-0 transition-colors"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex gap-2">
            {newTag.trim() && !predefinedOptions.includes(newTag.trim()) && (
              <button disabled={loading} onClick={() => handleAdd(newTag.trim())} className="bg-violet-600 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-violet-700 flex-1">Adicionar novo</button>
            )}
            <button disabled={loading} onClick={() => { setIsAdding(false); setShowDropdown(false); setNewTag(""); }} className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-md hover:bg-gray-200">X</button>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {tags.map((tag: string, idx: number) => {
          const key = `${tag}-${idx}`;
          if (renderBadge) {
            const el = renderBadge(tag, () => handleRemove(tag));
            return React.isValidElement(el) ? React.cloneElement(el as any, { key }) : <div key={key}>{el}</div>;
          }
          return (
            <div key={key} className={`group relative flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium border cursor-default transition-colors ${badgeClassName}`}>
              <span>{tag}</span>
              {!isReadOnly && (
                <button onClick={() => handleRemove(tag)} className="ml-1 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          );
        })}
        {tags.length === 0 && <span className="text-gray-400 text-sm italic">Nenhuma informação adicionada.</span>}
      </div>
    </div>
  );
}

function EditableTags({ title, tags, onAdd, onRemove, setTags, badgeClassName = "bg-gray-50 text-gray-700 border-gray-200", renderBadge, isReadOnly = false }: any) {
  const [isAdding, setIsAdding] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setLoading(true);
      try {
        await onAdd(newTag.trim());
        setTags([...tags, newTag.trim()]);
        setNewTag("");
        setIsAdding(false);
        window.location.reload();
      } catch (err) {
        alert("Erro ao adicionar.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleRemove = async (tag: string) => {
      try {
          await onRemove(tag);
          setTags(tags.filter((t: string) => t !== tag));
      } catch (err) {
          alert("Erro ao remover.");
      }
  };

  return (
    <div className="mb-10 w-full">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200">
        <h2 className="text-xl font-medium">{title}</h2>
        {!isReadOnly && (
          <button onClick={() => setIsAdding(!isAdding)} className="p-1.5 hover:bg-gray-100 rounded-md text-gray-500 transition-colors">
            <Plus className="w-5 h-5" />
          </button>
        )}
      </div>

      {isAdding && (
        <div className="flex flex-col sm:flex-row gap-2 mb-4 w-full">
          <div className="relative flex-1">
            <input 
              type="text" 
              value={newTag} 
              onChange={(e) => setNewTag(e.target.value)}
              disabled={loading}
              className="border border-gray-300 rounded-md px-3 py-1.5 text-sm w-full outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 pr-14"
              placeholder="Adicionar novo..."
              onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
              autoFocus
              maxLength={100}
            />
            <span className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs tabular-nums pointer-events-none ${ newTag.length > 85 ? 'text-orange-500 font-semibold' : 'text-gray-400' }`}>{newTag.length}/100</span>
          </div>
          <div className="flex gap-2">
            <button disabled={loading} onClick={handleAdd} className="bg-violet-600 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-violet-700 w-full sm:w-auto">Add</button>
            <button disabled={loading} onClick={() => setIsAdding(false)} className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-md hover:bg-gray-200">X</button>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {tags.map((tag: string, idx: number) => {
          const key = `${tag}-${idx}`;
          if (renderBadge) {
            const el = renderBadge(tag, () => handleRemove(tag));
            return React.isValidElement(el) ? React.cloneElement(el as any, { key }) : <div key={key}>{el}</div>;
          }
          return (
            <div key={key} className={`group relative flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium border cursor-default transition-colors ${badgeClassName}`}>
              <span>{tag}</span>
              {!isReadOnly && (
                <button onClick={() => handleRemove(tag)} className="ml-1 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          );
        })}
        {tags.length === 0 && <span className="text-gray-400 text-sm italic">Nenhuma informação adicionada.</span>}
      </div>
    </div>
  );
}

function EditableExperienceList({ title, items, userId, setItems, isReadOnly = false }: any) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ role: '', company: '', date: '', end_date: '', description: '' });
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!formData.role.trim() || !formData.company.trim()) return;
    setLoading(true);
    try {
      if (editingId) {
        await actions.updateExperience(userId, editingId, formData);
        setItems(items.map((i: any) => i.id === editingId ? { ...formData, id: editingId } : i));
      } else {
        await actions.addExperience(userId, formData);
        window.location.reload();
      }
      setIsAdding(false);
    } catch (err) {
      alert("Erro ao salvar.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remover esta experiência?")) return;
    try {
      await actions.deleteExperience(userId, id);
      setItems(items.filter((i: any) => i.id !== id));
    } catch (err) {
      alert("Erro ao remover.");
    }
  };

  return (
    <div className="mb-10 w-full">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200">
        <h2 className="text-xl font-medium">{title}</h2>
        {!isReadOnly && (
          <button onClick={() => { setFormData({role:'', company:'', date:'', end_date:'', description:''}); setEditingId(null); setIsAdding(true); }} className="p-1.5 hover:bg-gray-100 rounded-md text-gray-500 transition-colors">
            <Plus className="w-5 h-5" />
          </button>
        )}
      </div>

      {isAdding && (
        <div className="border border-violet-700 bg-violet-50/50 p-4 rounded-lg mb-4 flex flex-col gap-3 text-gray-900">
          <div className="relative">
            <input type="text" placeholder="Cargo" value={formData.role || ''} onChange={e => setFormData({...formData, role: e.target.value})} className="border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-violet-500 w-full pr-16" maxLength={100} />
            <span className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs tabular-nums pointer-events-none ${ (formData.role||'').length > 85 ? 'text-orange-500 font-semibold' : 'text-gray-400' }`}>{(formData.role||'').length}/100</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input type="text" placeholder="Empresa" value={formData.company || ''} onChange={e => setFormData({...formData, company: e.target.value})} className="border border-gray-300 rounded px-3 py-2 text-sm w-full outline-none focus:border-violet-500 pr-16" maxLength={100} />
              <span className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs tabular-nums pointer-events-none ${ (formData.company||'').length > 85 ? 'text-orange-500 font-semibold' : 'text-gray-400' }`}>{(formData.company||'').length}/100</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
             <div className="flex-1">
               <label className="text-xs text-gray-600 block mb-1">Data de Início</label>
               <input type="date" value={formData.date || ''} onChange={e => setFormData({...formData, date: e.target.value})} className="border border-gray-300 rounded px-3 py-2 text-sm w-full outline-none focus:border-violet-500" />
             </div>
             <div className="flex-1">
               <label className="text-xs text-gray-600 block mb-1">Data de Término</label>
               <input type="date" value={formData.end_date || ''} onChange={e => setFormData({...formData, end_date: e.target.value})} className="border border-gray-300 rounded px-3 py-2 text-sm w-full outline-none focus:border-violet-500" />
             </div>
          </div>
          <div className="relative">
            <textarea placeholder="Descrição" value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} rows={3} className="border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-violet-500 resize-none w-full pb-5" maxLength={250} />
            <span className={`absolute bottom-2 right-3 text-xs tabular-nums pointer-events-none ${ (formData.description||'').length > 225 ? 'text-orange-500 font-semibold' : 'text-gray-400' }`}>{(formData.description||'').length}/250</span>
          </div>
          <div className="flex gap-2 justify-end mt-2">
            <button disabled={loading} onClick={() => setIsAdding(false)} className="px-4 py-1.5 rounded-md text-sm font-medium text-gray-600 bg-white border border-gray-300 hover:bg-gray-50">Cancelar</button>
            <button disabled={loading} onClick={handleSave} className="px-4 py-1.5 rounded-md text-sm font-medium bg-violet-700 text-white hover:bg-violet-600">OK</button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4 text-sm sm:text-base">
        {items.map((item: any) => (
          <div key={item.id} className="group relative border border-gray-100 p-4 rounded-lg hover:shadow-sm transition-shadow">
            {!isReadOnly && (
              <div className="absolute top-4 right-4 flex gap-1 sm:opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 p-0.5 rounded">
                <button onClick={() => { 
                  setEditingId(item.id); 
                  setFormData({
                    role: item.role || '',
                    company: item.company || '',
                    date: item.date || '',
                    end_date: item.end_date || '',
                    description: item.description || ''
                  }); 
                  setIsAdding(true); 
                }} className="p-1.5 text-gray-500 hover:bg-violet-50 hover:text-violet-600 rounded-md transition-colors"><Edit2 className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(item.id)} className="p-1.5 text-gray-500 hover:bg-red-50 hover:text-red-600 rounded-md transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            )}
            <h3 className="font-medium text-gray-800 text-lg pr-16">{item.role}</h3>
            <p className="text-gray-500 text-sm mb-2">{item.company}{item.date || item.end_date ? ` | ${item.date ? formatDate(item.date) : ''}${item.date && item.end_date ? ' até ' : ''}${item.end_date ? formatDate(item.end_date) : ''}` : ''}</p>
            {item.description && (
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {item.description.split('\n').filter((l: string) => l.trim()).map((line: string, idx: number) => (
                  <li key={idx} className="break-words">{line}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
        {items.length === 0 && <span className="text-gray-400 text-sm italic">Nenhuma informação adicionada.</span>}
      </div>
    </div>
  );
}

function EditableCertificationList({ title, items, userId, setItems, isReadOnly = false }: any) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', issuer: '', issue_date: '' });
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!formData.name.trim()) return;
    setLoading(true);
    try {
      if (editingId) {
        await actions.updateCertification(userId, editingId, formData);
        setItems(items.map((i: any) => i.id === editingId ? { ...formData, id: editingId } : i));
      } else {
        await actions.addCertification(userId, formData);
        window.location.reload();
      }
      setIsAdding(false);
    } catch (err) {
      alert("Erro ao salvar.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remover esta certificação?")) return;
    try {
      await actions.deleteCertification(userId, id);
      setItems(items.filter((i: any) => i.id !== id));
    } catch (err) {
      alert("Erro ao remover.");
    }
  };

  return (
    <div className="mb-10 w-full">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200">
        <h2 className="text-xl font-medium">{title}</h2>
        {!isReadOnly && (
          <button onClick={() => { setFormData({name:'', issuer:'', issue_date:''}); setEditingId(null); setIsAdding(true); }} className="p-1.5 hover:bg-gray-100 rounded-md text-gray-500 transition-colors">
            <Plus className="w-5 h-5" />
          </button>
        )}
      </div>

      {isAdding && (
        <div className="border border-violet-700 bg-violet-50/50 p-4 rounded-lg mb-4 flex flex-col gap-3 text-gray-900">
          <div className="relative">
            <input type="text" placeholder="Nome da Certificação" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} className="border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-violet-500 w-full pr-16" maxLength={100} />
            <span className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs tabular-nums pointer-events-none ${ (formData.name||'').length > 85 ? 'text-orange-500 font-semibold' : 'text-gray-400' }`}>{(formData.name||'').length}/100</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input type="text" placeholder="Local / Instituição" value={formData.issuer || ''} onChange={e => setFormData({...formData, issuer: e.target.value})} className="border border-gray-300 rounded px-3 py-2 text-sm w-full outline-none focus:border-violet-500 pr-16" maxLength={100} />
              <span className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs tabular-nums pointer-events-none ${ (formData.issuer||'').length > 85 ? 'text-orange-500 font-semibold' : 'text-gray-400' }`}>{(formData.issuer||'').length}/100</span>
            </div>
            <div className="relative flex-1">
              <label className="text-xs text-gray-600 block mb-1">Data da Certificação</label>
              <input type="date" value={formData.issue_date || ''} onChange={e => setFormData({...formData, issue_date: e.target.value})} className="border border-gray-300 rounded px-3 py-2 text-sm w-full outline-none focus:border-violet-500" />
            </div>
          </div>
          <div className="flex gap-2 justify-end mt-2">
            <button disabled={loading} onClick={() => setIsAdding(false)} className="px-4 py-1.5 rounded-md text-sm font-medium text-gray-600 bg-white border border-gray-300 hover:bg-gray-50">Cancelar</button>
            <button disabled={loading} onClick={handleSave} className="px-4 py-1.5 rounded-md text-sm font-medium bg-violet-700 text-white hover:bg-violet-600">OK</button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4 text-sm sm:text-base">
        {items.map((item: any) => (
          <div key={item.id} className="group relative border border-gray-100 p-4 rounded-lg hover:shadow-sm transition-shadow">
            {!isReadOnly && (
              <div className="absolute top-4 right-4 flex gap-1 sm:opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 p-0.5 rounded">
                <button onClick={() => { 
                  setEditingId(item.id); 
                  setFormData({
                    name: item.name || '',
                    issuer: item.issuer || '',
                    issue_date: item.issue_date || ''
                  }); 
                  setIsAdding(true); 
                }} className="p-1.5 text-gray-500 hover:bg-violet-50 hover:text-violet-600 rounded-md transition-colors"><Edit2 className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(item.id)} className="p-1.5 text-gray-500 hover:bg-red-50 hover:text-red-600 rounded-md transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            )}
            <div className="flex items-center gap-3 pr-16">
              <Award className="w-5 h-5 text-yellow-500 shrink-0" />
              <h3 className="font-medium text-gray-800 text-lg">{item.name}</h3>
            </div>
            {(item.issuer || item.issue_date) && (
              <p className="text-gray-500 text-sm mt-1 ml-8">
                {item.issuer}{item.issuer && item.issue_date && " | "}{formatDate(item.issue_date)}
              </p>
            )}
          </div>
        ))}
        {items.length === 0 && <span className="text-gray-400 text-sm italic">Nenhuma informação adicionada.</span>}
      </div>
    </div>
  );
}

function EditableExtraInfoList({ title, items, userId, setItems, isReadOnly = false }: any) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!formData.title.trim()) return;
    setLoading(true);
    try {
      if (editingId) {
        await actions.updateExtraInfo(userId, editingId, formData);
        setItems(items.map((i: any) => i.id === editingId ? { ...formData, id: editingId } : i));
      } else {
        await actions.addExtraInfo(userId, formData);
        window.location.reload();
      }
      setIsAdding(false);
    } catch (err) {
      alert("Erro ao salvar.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
      try {
          await actions.deleteExtraInfo(userId, id);
          setItems(items.filter((i: any) => i.id !== id));
      } catch (err) {
          alert("Erro ao remover.");
      }
  };

  return (
    <div className="mb-10 w-full">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200">
        <h2 className="text-xl font-medium">{title}</h2>
        {!isReadOnly && (
          <button onClick={() => { setFormData({title:'', description:''}); setEditingId(null); setIsAdding(true); }} className="p-1.5 hover:bg-gray-100 rounded-md text-gray-500 transition-colors">
            <Plus className="w-5 h-5" />
          </button>
        )}
      </div>

      {isAdding && (
        <div className="border border-violet-700 bg-violet-50/50 p-4 rounded-lg mb-4 flex flex-col gap-3">
          <div className="relative">
            <input type="text" placeholder="Título" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-violet-500 w-full pr-16" maxLength={100} />
            <span className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs tabular-nums pointer-events-none ${ formData.title.length > 85 ? 'text-orange-500 font-semibold' : 'text-gray-400' }`}>{formData.title.length}/100</span>
          </div>
          <div className="relative">
            <textarea placeholder="Descrição" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={2} className="border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-violet-500 resize-none w-full pb-5" maxLength={100} />
            <span className={`absolute bottom-2 right-3 text-xs tabular-nums pointer-events-none ${ formData.description.length > 85 ? 'text-orange-500 font-semibold' : 'text-gray-400' }`}>{formData.description.length}/100</span>
          </div>
          <div className="flex gap-2 justify-end mt-2">
            <button disabled={loading} onClick={() => setIsAdding(false)} className="px-4 py-1.5 rounded-md text-sm font-medium text-gray-600 bg-white border border-gray-300 hover:bg-gray-50">Sair</button>
            <button disabled={loading} onClick={handleSave} className="px-4 py-1.5 rounded-md text-sm font-medium bg-violet-700 text-white hover:bg-violet-600">OK</button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3 text-sm sm:text-base text-gray-700">
        {items.map((item: any) => (
          <div key={item.id} className="group relative pr-16 p-3 border border-transparent hover:border-gray-100 hover:bg-gray-50 rounded-lg transition-colors">
            {!isReadOnly && (
              <div className="absolute top-3 right-3 flex gap-1 sm:opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 sm:bg-transparent rounded-md">
                <button onClick={() => { setEditingId(item.id); setFormData({title: item.title, description: item.description}); setIsAdding(true); }} className="p-1.5 text-gray-500 hover:text-violet-600 hover:bg-violet-50 rounded-md transition-colors"><Edit2 className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(item.id)} className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            )}
            <p className="mb-1 text-gray-800 break-words"><strong>{item.title}:</strong> <span className="text-gray-600">{item.description}</span></p>
          </div>
        ))}
        {items.length === 0 && <span className="text-gray-400 text-sm italic">Nenhuma informação adicionada.</span>}
      </div>
    </div>
  );
}

function EditableProjectsList({ title, items, userId, setItems, isReadOnly = false }: any) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ identifier: '', date: '', name: '', description: '', url: '' });
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!formData.name.trim()) return;
    setLoading(true);
    try {
      if (editingId) {
        await actions.updateProject(userId, editingId, formData);
        setItems(items.map((i: any) => i.id === editingId ? { ...formData, id: editingId } : i));
      } else {
        await actions.addProject(userId, formData);
        window.location.reload();
      }
      setIsAdding(false);
    } catch (err) {
      alert("Erro ao salvar.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await actions.deleteProject(userId, id);
      setItems(items.filter((i: any) => i.id !== id));
    } catch (err) {
      alert("Erro ao remover.");
    }
  };

  return (
    <div className="mb-4 w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-medium">{title}</h2>
        {!isReadOnly && (
          <button onClick={() => { setFormData({identifier: '', date: '', name: '', description: '', url: ''}); setEditingId(null); setIsAdding(true); }} className="p-1.5 hover:bg-gray-100 rounded-md text-gray-500 transition-colors">
            <Plus className="w-5 h-5" />
          </button>
        )}
      </div>

      {isAdding && (
        <div className="border border-violet-700 bg-violet-50/50 p-4 rounded-lg mb-4 flex flex-col gap-3 text-gray-900">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input type="text" placeholder="Nome do Projeto" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} className="border border-gray-300 rounded px-3 py-2 text-sm w-full outline-none focus:border-violet-500 pr-16" maxLength={100} />
              <span className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs tabular-nums pointer-events-none ${ (formData.name||'').length > 85 ? 'text-orange-500 font-semibold' : 'text-gray-400' }`}>{(formData.name||'').length}/100</span>
            </div>
            <input type="text" placeholder="URL" value={formData.url || ''} onChange={e => setFormData({...formData, url: e.target.value})} className="border border-gray-300 rounded px-3 py-2 text-sm flex-1 outline-none focus:border-violet-500" maxLength={100} />
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <input type="text" placeholder="Identificação / Referência" value={formData.identifier || ''} onChange={e => setFormData({...formData, identifier: e.target.value})} className="border border-gray-300 rounded px-3 py-2 text-sm flex-1 outline-none focus:border-violet-500" maxLength={100} />
            <div className="flex-1">
              <label className="text-xs text-gray-600 block mb-1">Data do Projeto</label>
              <input type="date" value={formData.date || ''} onChange={e => setFormData({...formData, date: e.target.value})} className="border border-gray-300 rounded px-3 py-2 text-sm w-full outline-none focus:border-violet-500" />
            </div>
          </div>
          <div className="relative">
            <textarea placeholder="Descrição curta" value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} rows={2} className="border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-violet-500 resize-none w-full pb-5" maxLength={250} />
            <span className={`absolute bottom-2 right-3 text-xs tabular-nums pointer-events-none ${ (formData.description||'').length > 225 ? 'text-orange-500 font-semibold' : 'text-gray-400' }`}>{(formData.description||'').length}/250</span>
          </div>
          <div className="flex gap-2 justify-end mt-2">
            <button disabled={loading} onClick={() => setIsAdding(false)} className="px-3 py-1.5 rounded-md text-sm font-medium text-gray-600 bg-white border border-gray-300 hover:bg-gray-50">Sair</button>
            <button disabled={loading} onClick={handleSave} className="px-3 py-1.5 rounded-md text-sm font-medium bg-violet-700 text-white hover:bg-violet-600">OK</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item: any) => (
          <div key={item.id} className="group relative h-full flex flex-col border border-gray-200 rounded-md p-5 bg-white hover:border-gray-300 transition-colors shadow-sm">
            <div className="flex items-start gap-2 mb-3 pr-10">
              <FolderGit2 className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <h3 className="font-medium text-gray-800 text-lg flex flex-wrap items-center gap-2">
                  {item.identifier && <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded border border-gray-200">{item.identifier}</span>}
                  {item.name}
                </h3>
                {item.date && <span className="text-xs text-gray-400 mt-1">{formatDate(item.date)}</span>}
              </div>
            </div>
            
            <p className="text-sm text-gray-600 flex-1 mb-5">{item.description}</p>
            
            <div className="mt-auto">
               <a href={ensureExternalLink(item.url)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-600 hover:text-violet-800 border border-violet-300 focus:border-violet-700 bg-violet-50/50 hover:bg-violet-50 px-4 py-2 rounded-lg transition-colors">
                  <ExternalLink className="w-4 h-4" />
                  Ver projeto
               </a>
            </div>

            {!isReadOnly && (
              <div className="absolute top-3 right-3 flex gap-1 sm:opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 p-1 rounded-md shadow-sm border border-gray-100">
                <button onClick={() => { 
                  setEditingId(item.id); 
                  setFormData({
                    identifier: item.identifier || '',
                    date: item.date || '',
                    name: item.name || '',
                    description: item.description || '',
                    url: item.url || ''
                  }); 
                  setIsAdding(true); 
                }} className="p-1.5 text-gray-500 hover:text-violet-600 hover:bg-violet-50 rounded-md transition-colors"><Edit2 className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(item.id)} className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            )}
          </div>
        ))}
        {items.length === 0 && <span className="text-gray-400 text-sm italic">Nenhuma informação adicionada.</span>}
      </div>
    </div>
  );
}

