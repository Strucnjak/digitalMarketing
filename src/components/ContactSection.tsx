import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, MessageSquare, User, Building } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { EMAIL, PHONE, ADDRESS } from "../config/contact";

export function ContactSection() {
  const { t: _t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, language }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        const message = data?.errors ? Object.values(data.errors).join(", ") : "Failed to send message";
        throw new Error(message);
      }

      setIsSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          company: "",
          message: "",
          phone: "",
        });
      }, 3000);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to send message";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const contactInfo = [
    {
      icon: Mail,
      title: _t("contact.info.email"),
      content: EMAIL,
      link: `mailto:${EMAIL}`,
      description: _t("contact.info.emailDesc"),
    },
    {
      icon: Phone,
      title: _t("contact.info.phone"),
      content: PHONE,
      link: `tel:${PHONE.replace(/\s+/g, "")}`,
      description: _t("contact.info.phoneDesc"),
    },
    {
      icon: MapPin,
      title: _t("contact.info.location"),
      content: ADDRESS,
      link: "https://maps.google.com",
      description: _t("contact.info.locationDesc"),
    },
    {
      icon: Clock,
      title: _t("contact.info.hours"),
      content: "09:00 - 17:00",
      link: null,
      description: _t("contact.info.hoursDesc"),
    },
  ];

  const stats = [
    { value: "24h", label: _t("contact.stats.response") },
    { value: "100%", label: _t("contact.stats.clients") },
    { value: "24/7", label: _t("contact.stats.support") },
    { value: "5+", label: _t("contact.stats.years") },
  ];

  return (
    <section id="contact" className="bg-gradient-to-b from-gray-50 to-white py-16 lg:py-24 dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <Badge className="bg-bdigital-cyan/10 text-bdigital-cyan-dark border-bdigital-cyan-dark/20 mb-4 px-4 py-2">{_t("contact.badge")}</Badge>
          <h2 className="mb-4 text-3xl font-bold text-bdigital-navy sm:text-4xl lg:mb-6 lg:text-5xl dark:text-slate-100">
            {_t("contact.heading.part1")} <span className="text-bdigital-cyan-dark">{_t("contact.heading.emphasis")}</span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-neutral-gray leading-relaxed lg:text-xl dark:text-slate-300">
            {_t("contact.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <Card className="border-0 shadow-xl dark:border dark:border-slate-800 dark:bg-slate-900">
            <CardContent className="p-6 lg:p-8">
              <div className="flex items-center mb-6">
                <MessageSquare className="h-6 w-6 text-bdigital-cyan mr-3" />
                <h3 className="text-xl font-bold text-bdigital-navy lg:text-2xl dark:text-slate-100">{_t("contact.form.title")}</h3>
              </div>

              {isSubmitted ? (
                <div className="text-center py-8 lg:py-12">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-emerald-900/40">
                    <CheckCircle className="h-8 w-8 text-green-600 dark:text-emerald-300" />
                  </div>
                  <h4 className="mb-2 text-lg font-semibold text-bdigital-navy dark:text-slate-100">{_t("contact.success.title")}</h4>
                  <p className="text-neutral-gray dark:text-slate-300">{_t("contact.success.desc")}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="mb-2 flex items-center text-sm font-medium text-bdigital-navy dark:text-slate-200">
                        <User className="h-4 w-4 mr-2" />
                        {_t("contact.name")} *
                      </label>
                      <Input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder={_t("form.placeholder_full_name")}
                        required
                        className="border-gray-300 focus:border-bdigital-cyan focus:ring-bdigital-cyan dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100 dark:placeholder:text-slate-500"
                      />
                    </div>
                    <div>
                      <label className="mb-2 flex items-center text-sm font-medium text-bdigital-navy dark:text-slate-200">
                        <Mail className="h-4 w-4 mr-2" />
                        {_t("contact.email")} *
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder={_t("form.placeholder_email")}
                        required
                        className="border-gray-300 focus:border-bdigital-cyan focus:ring-bdigital-cyan dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100 dark:placeholder:text-slate-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="mb-2 flex items-center text-sm font-medium text-bdigital-navy dark:text-slate-200">
                        <Building className="h-4 w-4 mr-2" />
                        {_t("contact.company")}
                      </label>
                      <Input
                        type="text"
                        value={formData.company}
                        onChange={(e) => handleChange("company", e.target.value)}
                        placeholder={_t("form.placeholder_company")}
                        className="border-gray-300 focus:border-bdigital-cyan focus:ring-bdigital-cyan dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100 dark:placeholder:text-slate-500"
                      />
                    </div>
                    <div>
                      <label className="mb-2 flex items-center text-sm font-medium text-bdigital-navy dark:text-slate-200">
                        <Phone className="h-4 w-4 mr-2" />
                        {_t("contact.phone")}
                      </label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        placeholder={_t("form.placeholder_phone")}
                        className="border-gray-300 focus:border-bdigital-cyan focus:ring-bdigital-cyan dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100 dark:placeholder:text-slate-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 flex items-center text-sm font-medium text-bdigital-navy dark:text-slate-200">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      {_t("contact.message")} *
                    </label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      placeholder={_t("form.placeholder_additional_info")}
                      required
                      className="min-h-[120px] resize-none border-gray-300 focus:border-bdigital-cyan focus:ring-bdigital-cyan dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100 dark:placeholder:text-slate-500"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-bdigital-cyan text-bdigital-navy hover:bg-bdigital-cyan-light font-semibold py-3 text-base shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-bdigital-navy mr-2"></div>
                        {_t("contact.sending")}
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        {_t("contact.send")}
                      </>
                    )}
                  </Button>
                  {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}
                </form>
              )}
            </CardContent>
          </Card>

          {/* Contact Information */}
            <div className="space-y-6">
              {/* Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {contactInfo.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                  <Card key={index} className="border-0 shadow-lg transition-all duration-300 hover:shadow-xl group dark:border dark:border-slate-800 dark:bg-slate-900">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-bdigital-cyan/10 rounded-xl flex items-center justify-center group-hover:bg-bdigital-cyan group-hover:scale-110 transition-all duration-300">
                          <IconComponent className="h-6 w-6 text-bdigital-cyan group-hover:text-bdigital-navy" />
                        </div>
                        <div className="flex-1">
                          <h4 className="mb-1 font-semibold text-bdigital-navy dark:text-slate-100">{item.title}</h4>
                          {item.link ? (
                            <a
                              href={item.link}
                              className="font-medium text-bdigital-cyan-dark transition-colors duration-200 hover:text-bdigital-navy dark:text-bdigital-cyan dark:hover:text-slate-100"
                            >
                              {item.content}
                            </a>
                          ) : (
                            <p className="font-medium text-bdigital-cyan-dark dark:text-bdigital-cyan">{item.content}</p>
                          )}
                          <p className="mt-1 text-sm text-neutral-gray dark:text-slate-300">{item.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Stats */}
            <Card className="border-0 shadow-xl bg-gradient-to-r from-bdigital-navy to-bdigital-dark-navy text-white">
              <CardContent className="p-6 lg:p-8">
                <h4 className="text-xl font-bold mb-6 text-center">
                  {_t("contact.stats.title.pre")} <span className="text-bdigital-cyan-dark">{_t("contact.stats.title.emphasis")}</span>
                </h4>
                <div className="grid grid-cols-2 gap-4 lg:gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center group">
                      <div className="text-2xl lg:text-3xl font-bold text-bdigital-cyan mb-1 group-hover:scale-110 transition-transform duration-300">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-300">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Map or Additional Info */}
            <Card className="border-0 shadow-xl dark:border dark:border-slate-800 dark:bg-slate-900">
              <CardContent className="p-6 lg:p-8">
                <h4 className="mb-4 text-xl font-bold text-bdigital-navy dark:text-slate-100">{_t("contact.meeting.title")}</h4>
                <p className="mb-4 text-neutral-gray dark:text-slate-300">{_t("contact.meeting.desc")}</p>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 text-bdigital-cyan mr-2" />
                    <span className="text-neutral-gray dark:text-slate-300">{_t("contact.meeting.flexible")}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 text-bdigital-cyan mr-2" />
                    <span className="text-neutral-gray dark:text-slate-300">{_t("contact.meeting.location")}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-bdigital-cyan mr-2" />
                    <span className="text-neutral-gray dark:text-slate-300">{_t("contact.meeting.free")}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
