import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle,
  MessageSquare,
  User,
  Building
} from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { EMAIL, PHONE, ADDRESS } from '../config/contact';

export function ContactSection() {
  const { t: _t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitted(true);
    setIsSubmitting(false);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        company: '',
        message: '',
        phone: ''
      });
    }, 3000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: EMAIL,
      link: `mailto:${EMAIL}`,
      description: _t('contact.info.emailDesc')
    },
    {
      icon: Phone,
      title: 'Telefon',
      content: PHONE,
      link: `tel:${PHONE.replace(/\s+/g, '')}`,
      description: _t('contact.info.phoneDesc')
    },
    {
      icon: MapPin,
      title: 'Lokacija',
      content: ADDRESS,
      link: 'https://maps.google.com',
      description: _t('contact.info.locationDesc')
    },
    {
      icon: Clock,
      title: 'Radno vreme',
      content: '09:00 - 17:00',
      link: null,
      description: _t('contact.info.hoursDesc')
    }
  ];

  const stats = [
    { value: '24h', label: _t('contact.stats.response') },
    { value: '100%', label: _t('contact.stats.clients') },
    { value: '24/7', label: _t('contact.stats.support') },
    { value: '5+', label: _t('contact.stats.years') }
  ];

  return (
    <section id="contact" className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <Badge className="bg-bdigital-cyan/10 text-bdigital-cyan border-bdigital-cyan/20 mb-4 px-4 py-2">
            {_t('contact.badge')}
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-bdigital-navy mb-4 lg:mb-6">
            {_t('contact.heading.part1')} <span className="text-bdigital-cyan">{_t('contact.heading.emphasis')}</span>
          </h2>
          <p className="text-lg lg:text-xl text-neutral-gray max-w-3xl mx-auto leading-relaxed">
            {_t('contact.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <Card className="border-0 shadow-xl">
            <CardContent className="p-6 lg:p-8">
              <div className="flex items-center mb-6">
                <MessageSquare className="h-6 w-6 text-bdigital-cyan mr-3" />
                <h3 className="text-xl lg:text-2xl font-bold text-bdigital-navy">
                  {_t('contact.form.title')}
                </h3>
              </div>
              
              {isSubmitted ? (
                <div className="text-center py-8 lg:py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-bdigital-navy mb-2">
                    {_t('contact.success.title')}
                  </h4>
                  <p className="text-neutral-gray">
                    {_t('contact.success.desc')}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center text-sm font-medium text-bdigital-navy mb-2">
                        <User className="h-4 w-4 mr-2" />
                        {_t('contact.name')} *
                      </label>
                      <Input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder="Vaše ime"
                        required
                        className="border-gray-300 focus:border-bdigital-cyan focus:ring-bdigital-cyan"
                      />
                    </div>
                    <div>
                      <label className="flex items-center text-sm font-medium text-bdigital-navy mb-2">
                        <Mail className="h-4 w-4 mr-2" />
                        {_t('contact.email')} *
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="vas@email.com"
                        required
                        className="border-gray-300 focus:border-bdigital-cyan focus:ring-bdigital-cyan"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center text-sm font-medium text-bdigital-navy mb-2">
                        <Building className="h-4 w-4 mr-2" />
                        {_t('contact.company')}
                      </label>
                      <Input
                        type="text"
                        value={formData.company}
                        onChange={(e) => handleChange('company', e.target.value)}
                        placeholder="Naziv kompanije"
                        className="border-gray-300 focus:border-bdigital-cyan focus:ring-bdigital-cyan"
                      />
                    </div>
                    <div>
                      <label className="flex items-center text-sm font-medium text-bdigital-navy mb-2">
                        <Phone className="h-4 w-4 mr-2" />
                        {_t('contact.phone')}
                      </label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        placeholder="+382 67 123 456"
                        className="border-gray-300 focus:border-bdigital-cyan focus:ring-bdigital-cyan"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center text-sm font-medium text-bdigital-navy mb-2">
                      <MessageSquare className="h-4 w-4 mr-2" />
                        {_t('contact.message')} *
                    </label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      placeholder="Opišite vaš projekat ili kako možemo da vam pomognemo..."
                      required
                      className="min-h-[120px] border-gray-300 focus:border-bdigital-cyan focus:ring-bdigital-cyan resize-none"
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
                        {_t('contact.sending')}
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        {_t('contact.send')}
                      </>
                    )}
                  </Button>
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
                  <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-bdigital-cyan/10 rounded-xl flex items-center justify-center group-hover:bg-bdigital-cyan group-hover:scale-110 transition-all duration-300">
                          <IconComponent className="h-6 w-6 text-bdigital-cyan group-hover:text-bdigital-navy" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-bdigital-navy mb-1">{item.title}</h4>
                          {item.link ? (
                            <a
                              href={item.link}
                              className="text-bdigital-cyan hover:text-bdigital-navy font-medium transition-colors duration-200"
                            >
                              {item.content}
                            </a>
                          ) : (
                            <p className="text-bdigital-cyan font-medium">{item.content}</p>
                          )}
                          <p className="text-sm text-neutral-gray mt-1">{item.description}</p>
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
                  {_t('contact.stats.title.pre')}{' '}
                  <span className="text-bdigital-cyan">{_t('contact.stats.title.emphasis')}</span>
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
            <Card className="border-0 shadow-xl">
              <CardContent className="p-6 lg:p-8">
                <h4 className="text-xl font-bold text-bdigital-navy mb-4">
                  {_t('contact.meeting.title')}
                </h4>
                <p className="text-neutral-gray mb-4">
                  {_t('contact.meeting.desc')}
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 text-bdigital-cyan mr-2" />
                    <span className="text-neutral-gray">{_t('contact.meeting.flexible')}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 text-bdigital-cyan mr-2" />
                    <span className="text-neutral-gray">{_t('contact.meeting.location')}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-bdigital-cyan mr-2" />
                    <span className="text-neutral-gray">{_t('contact.meeting.free')}</span>
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