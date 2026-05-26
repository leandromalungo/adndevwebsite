"use client";

import { MapPin, Loader2, Edit, X, Save, Mail, Phone, Briefcase, FileText, Camera, User } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { updateProfileInfo, updateUserName, updateProfilePhoto } from "@/app/actions/profile.actions";
import { useProfileCache } from "@/lib/useProfileCache";

interface ProfileSidebarProps {
  initialData: any;
  userId: string;
  isReadOnly?: boolean;
}

const IT_AREAS: Record<string, string[]> = {
  "Desenvolvimento de Software": ["Desenvolvedor Front-end", "Desenvolvedor Back-end", "Desenvolvedor Full Stack", "Desenvolvedor Mobile", "Desenvolvedor Desktop", "Desenvolvedor de Jogos", "Engenheiro de Software", "Software Architect", "QA Engineer", "Test Automation Engineer"],
  Cibersegurança: ["Analista de Segurança", "Pentester (Ethical Hacker)", "Security Engineer", "SOC Analyst", "Especialista em Resposta a Incidentes", "Analista Forense Digital", "GRC (Governança, Risco e Compliance)", "Security Architect", "Red Team", "violet Team"],
  "Redes e Infraestrutura": ["Administrador de Redes", "Network Engineer", "Técnico de Redes", "Especialista em Firewall", "Engenheiro de Infraestrutura", "NOC Analyst", "Administrador de Sistemas", "DevOps Engineer"],
  "Cloud Computing": ["Cloud Engineer", "Cloud Architect", "Cloud Administrator", "DevOps Cloud", "Site Reliability Engineer (SRE)", "Especialista AWS", "Especialista Azure", "Especialista Google Cloud"],
  "Ciência de Dados e IA": ["Data Analyst", "Data Scientist", "Machine Learning Engineer", "AI Engineer", "Data Engineer", "BI Analyst", "Especialista em Big Data"],
  "Suporte Técnico": ["Técnico de Suporte", "Help Desk Nível 1", "Help Desk Nível 2", "Help Desk Nível 3", "Field Support", "Técnico de Hardware"],
  "Gestão de TI": ["IT Manager", "CIO", "CTO", "Product Manager", "Project Manager", "Scrum Master", "IT Auditor", "Analista de Processos"],
  "UX/UI e Design Digital": ["UX Designer", "UI Designer", "Product Designer", "UX Researcher", "Interaction Designer"],
  "Banco de Dados": ["DBA", "Database Engineer", "Database Administrator", "Especialista SQL", "Especialista NoSQL"],
  "Automação e RPA": ["RPA Developer", "Automation Engineer", "QA Automation", "Especialista em Processos Automatizados"],
  "Blockchain e Web3": ["Blockchain Developer", "Smart Contract Developer", "Web3 Developer", "Especialista em Criptografia"],
  "IoT": ["IoT Engineer", "Embedded Systems Developer", "Firmware Developer", "Especialista em Sistemas Embarcados"],
};

const COUNTRY_DATA: Record<string, { placeholder: string }> = {
  Angola: { placeholder: "9XX XXX XXX" },
  Portugal: { placeholder: "9XX XXX XXX" },
  Brasil: { placeholder: "(XX) 9XXXX-XXXX" },
  Mozambique: { placeholder: "8X XXX XXXX" },
  "Cabo Verde": { placeholder: "XXX XX XX" },
  "Guiné-Bissau": { placeholder: "XXX XX XX" },
  "São Tomé e Príncipe": { placeholder: "XXX XX XX" },
  "Timor-Leste": { placeholder: "XXX XX XX" },
};

export default function ProfileSidebar({ initialData, userId, isReadOnly = false }: ProfileSidebarProps) {
  const router = useRouter();
  const { data: session, update: updateSession } = useSession();
  const user = session?.user;
  const cache = useProfileCache(userId);
  const source = initialData;

  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState(source.realName || "Utilizador");
  const [pais, setPais] = useState(source.profile?.country || "Angola");
  const [email, setEmail] = useState(source.profile?.email || user?.email || "");
  const [whatsapp, setWhatsapp] = useState(source.profile?.whatsapp || "");
  const [telegram, setTelegram] = useState(source.profile?.telegram || "");
  const [telefone, setTelefone] = useState(source.profile?.phone || "");
  const [itArea, setItArea] = useState(source.profile?.it_area || "");
  const [itRole, setItRole] = useState(source.profile?.it_role || "");
  const [username, setUsername] = useState(source.profile?.username || "");

  useEffect(() => {
    if (initialData) {
      setName(initialData.realName || "Utilizador");
      setPais(initialData.profile?.country || "Angola");
      setEmail(initialData.profile?.email || user?.email || "");
      setWhatsapp(initialData.profile?.whatsapp || "");
      setTelegram(initialData.profile?.telegram || "");
      setTelefone(initialData.profile?.phone || "");
      setItArea(initialData.profile?.it_area || "");
      setItRole(initialData.profile?.it_role || "");
      setUsername(initialData.profile?.username || "");
      cache.write(initialData);
    }
  }, [initialData, user?.email]);

  const [saveLoading, setSaveLoading] = useState(false);
  const [photoLoading, setPhotoLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showMoreOnMobile, setShowMoreOnMobile] = useState(false);

  const isProfileOwner = Boolean(user?.id && user.id === userId);

  useEffect(() => {
    if (!mounted) return;
    // Placeholder é atualizado conforme o país muda, mas não pré-preenchemos o código
  }, [pais, mounted, isReadOnly, telefone, whatsapp]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // source.image = dono do perfil (servidor); user.image = sessão (útil após upload / navbar)
  const profilePhoto = source?.image ?? user?.image ?? null;

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validação de Tamanho (máx 900KB)
    if (file.size > 900 * 1024) {
      alert("A foto deve ter menos de 900KB.");
      return;
    }

    // Validação de Formato (jpg, png)
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      alert("Formato inválido. Use apenas .jpg ou .png.");
      return;
    }

    setPhotoLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const result = await updateProfilePhoto(userId, formData);
      if (result.success && result.url) {
        await updateSession({ image: result.url });
        router.refresh();
      }
    } catch (err: any) {
      alert(err.message || "Erro ao atualizar foto.");
    } finally {
      setPhotoLoading(false);
    }
  };

  const handleSave = async () => {
    setSaveLoading(true);
    try {
      await Promise.all([
        updateUserName(userId, name),
        updateProfileInfo(userId, {
          country: pais,
          phone: telefone,
          whatsapp,
          telegram,
          it_area: itArea === "_manual" ? itAreaManual : itArea,
          it_role: itRole === "_manual" ? itRoleManual : itRole,
          username: username,
        })
      ]);
      setSaveSuccess(true);
      cache.invalidate();
      setTimeout(() => {
        setSaveSuccess(false);
        setIsEditing(false);
      }, 1200);
    } catch (err) {
      alert("Erro ao salvar alterações.");
    } finally {
      setSaveLoading(false);
    }
  };

  const [itAreaManual, setItAreaManual] = useState("");
  const [itRoleManual, setItRoleManual] = useState("");

  useEffect(() => {
     if (initialData && initialData.profile) {
        if (!Object.keys(IT_AREAS).includes(initialData.profile.it_area)) {
           setItAreaManual(initialData.profile.it_area || "");
        }
        if (initialData.profile.it_area && !IT_AREAS[initialData.profile.it_area]?.includes(initialData.profile.it_role)) {
           setItRoleManual(initialData.profile.it_role || "");
        }
     }
  }, [initialData]);

  const TelegramIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.891 8.11l-1.92 9.06c-.145.641-.527.797-1.066.495l-2.92-2.152-1.41 1.36c-.156.156-.285.285-.584.285l.209-2.983 5.43-4.908c.236-.209-.052-.326-.367-.116l-6.705 4.225-2.885-.9c-.628-.196-.641-.628.129-.93l11.282-4.348c.522-.196.979.117.816.892z"/>
    </svg>
  );

  return (
    <div className="w-full md:w-64 lg:w-72 shrink-0 flex flex-col gap-3 md:gap-5">
      {/* Top Header Section - Mobile: Photo left (small), Name/Email right | Desktop: Photo top (large), Name/Email below */}
      <div className="flex flex-row md:flex-col items-start md:items-center gap-3 md:gap-5 bg-white rounded-lg md:rounded-none p-3 md:p-0 md:bg-transparent">
        {/* Photo - Left side on mobile (small), full width on desktop (large) */}
        <div className="relative shrink-0 flex justify-center md:justify-start w-auto md:w-full group">
          <div className="w-20 h-20 md:w-[240px] md:h-[240px] rounded-full border border-gray-200 bg-white overflow-hidden shadow-sm relative flex-shrink-0">
            {profilePhoto ? (
              <Image
                src={profilePhoto}
                alt="Profile Avatar"
                width={240}
                height={240}
                className={`w-full h-full object-cover ${photoLoading ? "opacity-50" : ""}`}
                priority
              />
            ) : (
                <div className="w-full h-full bg-gray-50 flex items-center justify-center">
                    <User className="w-8 h-8 md:w-16 md:h-16 text-gray-200" /> {/* Ícone de utilizador neutro */}
                </div>
            )}

            {photoLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/5">
                <Loader2 className="w-6 h-6 md:w-8 md:h-8 animate-spin text-indigo-600" />
              </div>
            )}

            {!isReadOnly && (
              <label className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <div className="flex flex-col items-center text-white">
                  <Camera className="w-5 h-5 md:w-6 md:h-6 mb-1" />
                  <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-wider">Alterar Foto</span>
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/png, image/jpeg, image/jpg" 
                  onChange={handlePhotoUpload}
                  disabled={photoLoading}
                />
              </label>
            )}
          </div>

          {!isReadOnly && (
            <button
              onClick={() => setIsEditing(!isEditing)}
              title={isEditing ? "Cancelar edição" : "Editar perfil"}
              className="absolute -bottom-1 -right-1 md:top-1 md:left-[195px] md:right-auto w-8 h-8 md:w-9 md:h-9 bg-white border border-gray-300 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-100 transition"
            >
              {isEditing ? <X className="w-3 h-3 md:w-4 md:h-4 text-gray-600" /> : <Edit className="w-3 h-3 md:w-4 md:h-4 text-gray-600" />}
            </button>
          )}
        </div>

        <div className="flex-1 min-w-0 flex flex-col items-start md:items-center md:text-center gap-0.5 md:gap-4 w-full">
          <div className="w-full">
            <h1 className="text-sm md:text-xl font-normal text-gray-900 leading-tight truncate">
              {username ? `@${username}` : (name || "Utilizador")}
            </h1>
          </div>

          {/* Unified Info Section - Reorganized for mobile fit */}
          <div className="flex flex-col gap-1.5 md:gap-3 text-xs md:text-sm text-gray-700 border-t border-gray-200 pt-2 md:pt-4 w-full mt-1 md:mt-0">
            {/* Hidden Items on Mobile - Show only on desktop or when showMoreOnMobile is true */}
            <div className={`grid grid-cols-1 gap-1.5 md:gap-3 ${!showMoreOnMobile && 'hidden md:grid'}`}>
               {/* Career Items */}
               <div className="flex items-start gap-1.5 md:gap-2 bg-gray-50 md:bg-transparent p-1.5 md:p-0 rounded-md md:rounded-none border border-gray-100 md:border-0 md:mb-1">
                  <Briefcase className="w-3 h-3 md:w-4 md:h-4 text-gray-400 shrink-0 mt-0.5" />
                  <span className="break-words font-medium text-[10px] md:text-xs text-left">
                    {itRole ? <>{itRole}{itArea ? <span className="text-gray-400 font-normal"> · {itArea}</span> : null}</> : <span className="text-gray-400 italic">—</span>}
                  </span>
               </div>

               {/* Contact Items - Always visible as public data */}
               <>
                 <div className="flex items-start gap-1.5 md:gap-2 overflow-hidden bg-gray-50 md:bg-transparent p-1.5 md:p-0 rounded-md md:rounded-none border border-gray-100 md:border-0">
                   <Mail className="w-3 h-3 md:w-4 md:h-4 text-gray-400 shrink-0 mt-0.5" />
                   {email ? <span className="text-[10px] md:text-sm text-left">{email}</span> : <span className="text-gray-400 italic text-[10px]">—</span>}
                 </div>
                 <div className="flex items-start gap-1.5 md:gap-2 overflow-hidden bg-gray-50 md:bg-transparent p-1.5 md:p-0 rounded-md md:rounded-none border border-gray-100 md:border-0">
                   <Phone className="w-3 h-3 md:w-4 md:h-4 text-gray-400 shrink-0 mt-0.5" />
                   {telefone ? <span className="text-[10px] md:text-sm text-left">{telefone}</span> : <span className="text-gray-400 italic text-[10px]">—</span>}
                 </div>
                 <div className="flex items-start gap-1.5 md:gap-2 overflow-hidden bg-gray-50 md:bg-transparent p-1.5 md:p-0 rounded-md md:rounded-none border border-gray-100 md:border-0">
                    <svg className="w-3 h-3 md:w-4 md:h-4 text-gray-400 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                    {whatsapp ? <span className="text-[10px] md:text-sm text-left">{whatsapp}</span> : <span className="text-gray-400 italic text-[10px]">—</span>}
                 </div>
                 <div className="flex items-start gap-1.5 md:gap-2 overflow-hidden bg-gray-50 md:bg-transparent p-1.5 md:p-0 rounded-md md:rounded-none border border-gray-100 md:border-0">
                   <TelegramIcon className="w-3 h-3 md:w-4 md:h-4 text-gray-400 shrink-0 mt-0.5" />
                   {telegram ? <span className="text-[10px] md:text-sm text-left">{telegram}</span> : <span className="text-gray-400 italic text-[10px]">—</span>}
                 </div>
                 <div className="flex items-start gap-1.5 md:gap-2 overflow-hidden bg-gray-50 md:bg-transparent p-1.5 md:p-0 rounded-md md:rounded-none border border-gray-100 md:border-0">
                   <MapPin className="w-3 h-3 md:w-4 md:h-4 text-gray-400 shrink-0 mt-0.5" />
                   <span className="text-[10px] md:text-sm text-left">{pais}</span>
                 </div>
               </>
            </div>

            {/* Botão "Ver" em mobile */}
            <button
              onClick={() => setShowMoreOnMobile(!showMoreOnMobile)}
              className="md:hidden w-full py-1 px-2 bg-gray-100 border border-gray-200 rounded text-gray-600 hover:bg-gray-200 text-[8px] font-medium transition"
            >
              {showMoreOnMobile ? 'ocultar informacoes' : 'ver informacoes'}
            </button>
          </div>
        </div>
      </div>

      {/* Form Section */}
      {isEditing && (
        <div className="space-y-3 pt-3 border-t border-gray-100 mt-2">
          <div>
            <label className="block text-[11px] font-semibold text-gray-500 uppercase mb-1">Username (@)</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value.replace(/\s+/g, "").toLowerCase())} className="w-full border border-gray-300 px-3 py-1.5 rounded-md text-sm outline-none focus:border-indigo-500 transition" placeholder="seu_username" maxLength={50} />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-gray-500 uppercase mb-1">País</label>
            <select value={pais} onChange={(e) => setPais(e.target.value)} className="w-full border border-gray-300 px-3 py-1.5 rounded-md text-sm outline-none focus:border-indigo-500 transition">
              {Object.keys(COUNTRY_DATA).map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-gray-500 uppercase mb-1">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-gray-300 px-3 py-1.5 rounded-md text-sm outline-none focus:border-indigo-500 transition" placeholder="email@exemplo.com" maxLength={254} />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-gray-500 uppercase mb-1">Telefone / WhatsApp</label>
            <div className="grid grid-cols-2 gap-2">
                <input type="tel" value={telefone} onChange={(e) => setTelefone(e.target.value)} className="w-full border border-gray-300 px-2 py-1.5 rounded-md text-xs outline-none focus:border-indigo-500 transition" placeholder="Telefone" maxLength={25} />
                <input type="tel" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} className="w-full border border-gray-300 px-2 py-1.5 rounded-md text-xs outline-none focus:border-indigo-500 transition" placeholder="WhatsApp" maxLength={25} />
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-gray-500 uppercase mb-1">Telegram / Bio Curta</label>
            <input type="text" value={telegram} onChange={(e) => setTelegram(e.target.value)} className="w-full border border-gray-300 px-3 py-1.5 rounded-md text-xs outline-none focus:border-indigo-500 transition" placeholder="@telegram" maxLength={50} />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-gray-500 uppercase mb-1">Área e Função IT</label>
            <div className="space-y-2">
                <select value={Object.keys(IT_AREAS).includes(itArea) ? itArea : "_manual"} onChange={(e) => { setItArea(e.target.value); if (e.target.value !== "_manual") setItRole(""); }} className="w-full border border-gray-300 px-3 py-1.5 rounded-md text-xs outline-none focus:border-indigo-500 transition">
                  <option value="">Selecione a Área</option>
                  {Object.keys(IT_AREAS).map((area) => <option key={area} value={area}>{area}</option>)}
                  <option value="_manual">Outra / Manual</option>
                </select>
                {itArea === "_manual" && (
                  <input type="text" value={itAreaManual} onChange={(e) => setItAreaManual(e.target.value)} className="w-full border border-violet-300 px-3 py-1.5 rounded-md text-xs outline-none focus:border-indigo-500 transition bg-violet-50/30" placeholder="Nome da Área IT" maxLength={100} />
                )}
                
                <select value={itArea && IT_AREAS[itArea]?.includes(itRole) ? itRole : (itRole ? "_manual" : "")} onChange={(e) => { setItRole(e.target.value); }} disabled={itArea !== "_manual" && (!itArea || !IT_AREAS[itArea])} className="w-full border border-gray-300 px-3 py-1.5 rounded-md text-xs outline-none focus:border-indigo-500 transition disabled:opacity-50">
                  <option value="">Selecione a Função</option>
                  {itArea && IT_AREAS[itArea] && IT_AREAS[itArea].map((role) => <option key={role} value={role}>{role}</option>)}
                  {(itArea || itArea === "_manual") && <option value="_manual">Outra / Manual</option>}
                </select>
                {itRole === "_manual" && (
                  <input type="text" value={itRoleManual} onChange={(e) => setItRoleManual(e.target.value)} className="w-full border border-violet-300 px-3 py-1.5 rounded-md text-xs outline-none focus:border-indigo-500 transition bg-violet-50/30" placeholder="Nome da Função IT" maxLength={100} />
                )}
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={saveLoading}
            className={`w-full py-2.5 rounded-md text-sm font-bold shadow-sm transition flex items-center justify-center gap-2 ${saveSuccess ? "bg-green-100 text-green-700 border border-green-200" : "bg-indigo-600 hover:bg-indigo-700 text-white"}`}
          >
            {saveLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saveLoading ? "A guardar..." : saveSuccess ? "✓ Guardado!" : "Guardar alterações"}
          </button>
        </div>
      )}
    </div>
  );
}
