'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/lib/supabase-client';

interface JobPostFormProps {
  onJobPosted?: () => void;
}

export default function JobPostForm({ onJobPosted }: JobPostFormProps) {
  const [formData, setFormData] = useState({
    trade: '',
    jobDescription: '',
    postcode: '',
    budget: '',
    budgetType: 'fixed',
    preferredDate: '',
    preferredTime: 'any',
    images: [] as string[]
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showAISuggestions, setShowAISuggestions] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState('');



  const tradeOptions = [
    'Plumbing',
    'Electrical',
    'Carpentry',
    'Painting & Decorating',
    'Roofing',
    'Heating & Ventilation',
    'Garden & Landscaping',
    'Cleaning',
    'Carpet & Flooring',
    'Kitchen & Bathroom',
    'General Handyman',
    'Other'
  ];

  const budgetTypeOptions = [
    { value: 'fixed', label: 'Fixed Price' },
    { value: 'hourly', label: 'Hourly Rate' },
    { value: 'negotiable', label: 'Negotiable' }
  ];

  const timeOptions = [
    { value: 'any', label: 'Any Time' },
    { value: 'morning', label: 'Morning (8AM-12PM)' },
    { value: 'afternoon', label: 'Afternoon (12PM-5PM)' },
    { value: 'evening', label: 'Evening (5PM-8PM)' }
  ];

  // AI-powered job description suggestions based on trade
  const getAISuggestions = (trade: string) => {
    const suggestions = {
      'Plumbing': [
        "I need a qualified plumber to fix a leaking kitchen tap. The tap has been dripping constantly for 2 days. Located under the sink, easy access. Please bring necessary parts.",
        "Bathroom toilet is blocked and won't flush properly. Need urgent plumbing help. Have tried basic unblocking but issue persists. Ground floor bathroom.",
        "Installing a new washing machine in utility room. Need plumber to connect water supply and drainage. All pipes are accessible. Machine is already delivered.",
        "Shower pressure is very low in upstairs bathroom. All other taps work fine. Need diagnosis and repair. Prefer morning appointment if possible."
      ],
      'Electrical': [
        "Need qualified electrician to install 3 new power sockets in living room. Walls are plasterboard, easy access. All materials to be provided by tradesperson.",
        "Kitchen lights keep flickering and sometimes go off completely. Need urgent electrical inspection and repair. Safety concern with young children in house.",
        "Installing new electric oven in kitchen. Need electrician to connect to mains supply. Existing connection point available. Oven is already purchased.",
        "Outdoor security lights not working after recent storm. Need electrician to check wiring and replace if necessary. 2 lights on front of house."
      ],
      'Carpentry': [
        "Need custom-built shelving unit for living room alcove. Measurements: 2m wide x 2.5m high x 30cm deep. Pine wood preferred. Include 4 adjustable shelves.",
        "Kitchen cabinet door has come off hinges and won't close properly. Need carpenter to repair or replace hinges. Door is solid wood, standard size.",
        "Building a garden shed foundation and frame. Concrete base already laid. Need experienced carpenter for wooden frame construction. Materials list available.",
        "Wooden stairs creaking badly, especially 3rd and 7th steps. Need carpenter to inspect and repair. Stairs are painted softwood, straight flight."
      ],
      'Painting & Decorating': [
        "Need living room painted - 2 coats throughout. Room size: 4m x 5m, standard height ceiling. Currently magnolia, want to change to light grey. Include ceiling.",
        "Exterior front door needs stripping and repainting. Door is wooden, currently blue paint is peeling. Want professional finish in black. Include frame touch-up.",
        "Bedroom wallpaper removal and painting. One feature wall has textured wallpaper that needs careful removal. Room is 3m x 4m. Paint in neutral colors.",
        "Hallway and stairs decorating. Walls need filling and painting, woodwork needs gloss paint. High ceiling area, need experienced decorator with proper equipment."
      ],
      'Roofing': [
        "Several roof tiles are loose/missing after recent storm. Need roofer to inspect and replace tiles. Two-story house, pitched roof. Safety equipment essential.",
        "Guttering is overflowing during rain. Need cleaning and possible repair/replacement. Full house perimeter, includes downpipes. Access from garden available.",
        "Small leak in bedroom ceiling during heavy rain. Need roof inspection to find source and repair. Leak appears to be above window area.",
        "Flat roof garage needs waterproofing. Current felt is cracking and letting water in. Garage is 3m x 6m. Need durable solution."
      ],
      'Heating & Ventilation': [
        "Central heating boiler not working - no hot water or heating. Boiler is 8 years old, serviced annually. Need urgent repair, family with young children.",
        "Installing new bathroom extractor fan. Bathroom gets very steamy, need powerful fan with timer. Ducting to external wall required.",
        "Radiator in bedroom not heating up while others work fine. Need heating engineer to diagnose and repair. System was working fine until last week.",
        "Annual boiler service required. Gas boiler, last serviced 12 months ago. Need Gas Safe registered engineer. Prefer morning appointment."
      ],
      'Garden & Landscaping': [
        "Garden lawn needs complete renovation. Current grass is patchy and full of weeds. Garden is 10m x 8m, south-facing. Want professional lawn laying.",
        "Building raised flower beds along garden fence. Need 3 beds, each 2m long x 1m wide x 0.5m high. Include soil and basic planting advice.",
        "Tree pruning required - large oak tree overhanging neighbor's property. Need qualified tree surgeon with insurance. Tree is approximately 15m tall.",
        "Patio area needs pressure washing and re-pointing. Patio is 4m x 6m, natural stone. Some slabs are loose and need re-laying."
      ],
      'Cleaning': [
        "Deep clean of entire house after renovation work. 3-bedroom house, lots of dust and debris. Need professional cleaning team with industrial equipment.",
        "End of tenancy cleaning required. 2-bedroom flat, good condition but needs thorough clean for deposit return. Include oven, carpets, windows.",
        "Office cleaning contract - small office with 6 desks, kitchen area, 2 bathrooms. Need weekly cleaning service. Prefer early morning or evening.",
        "Carpet cleaning for living room and stairs. High-traffic areas with some stains. Carpets are light colored, need professional steam cleaning."
      ],
      'Kitchen & Bathroom': [
        "Complete bathroom renovation - remove old suite and install new. Bathroom is 2m x 2m, includes tiling, plumbing, electrical work. New suite already purchased.",
        "Kitchen worktop replacement - current laminate is damaged. Kitchen is L-shaped, approximately 4m total length. Prefer granite or quartz surface.",
        "Installing new bathroom shower - converting bath to walk-in shower. Need tiling, plumbing, and waterproofing. Bathroom is upstairs, good access.",
        "Kitchen cabinet doors need replacing - existing carcasses are good. 12 doors and 4 drawer fronts. Prefer modern white gloss finish."
      ],
      'General Handyman': [
        "Various small jobs around the house: fix squeaky door hinges, replace broken light switch, adjust wardrobe door, touch up paint in hallway.",
        "Flat-pack furniture assembly - large wardrobe and chest of drawers for bedroom. All parts and instructions included. Need someone with experience.",
        "Picture hanging and wall mounting - need 8 large pictures hung securely, plus TV wall mount in living room. Walls are plasterboard over brick.",
        "Garden gate repair - wooden gate is sagging and won't close properly. Hinges may need replacing. Gate is 1.8m high, standard width."
      ]
    };

    return suggestions[trade as keyof typeof suggestions] || [
      "Please describe your job in detail including: what needs to be done, location/room, any specific requirements, materials needed, and preferred timing.",
      "Be specific about the problem or work required. Include measurements, colors, materials, or any special considerations.",
      "Mention if you have materials already or if the tradesperson should provide them. Include access information and any time constraints.",
      "Describe the current situation and what you want to achieve. Include any relevant background information or previous attempts to fix the issue."
    ];
  };


  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSuggestionClick = (suggestion: string) => {
    setFormData(prev => ({
      ...prev,
      jobDescription: suggestion
    }));
    setSelectedSuggestion(suggestion);
    setShowAISuggestions(false);
  };

  const handleDescriptionFocus = () => {
    if (formData.trade && !formData.jobDescription) {
      setShowAISuggestions(true);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setIsSubmitting(true);
    setError('');

    try {
      const uploadedUrls: string[] = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `job-images/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('job-images')
          .upload(filePath, file);

        if (uploadError) {
          throw new Error(`Failed to upload image: ${uploadError.message}`);
        }

        const { data: { publicUrl } } = supabase.storage
          .from('job-images')
          .getPublicUrl(filePath);

        uploadedUrls.push(publicUrl);
      }

      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls]
      }));

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload images');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      // Get user email from localStorage
      const userData = localStorage.getItem('user');
      if (!userData) {
        throw new Error('You must be logged in to post a job');
      }

      const user = JSON.parse(userData);
      const clientEmail = user.email;

      // Create job posting via API
      const response = await fetch('/api/jobs/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientEmail,
          trade: formData.trade,
          jobDescription: formData.jobDescription,
          postcode: formData.postcode,
          budget: formData.budget,
          budgetType: formData.budgetType,
          images: formData.images,
          preferredDate: formData.preferredDate,
          preferredTime: formData.preferredTime
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to post job');
      }

      setSuccess('Job posted successfully!');
      
      // Reset form
      setFormData({
        trade: '',
        jobDescription: '',
        postcode: '',
        budget: '',
        budgetType: 'fixed',
        preferredDate: '',
        preferredTime: 'any',
        images: []
      });

      // Call callback if provided
      if (onJobPosted) {
        onJobPosted();
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to post job');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Post a New Job</CardTitle>
        <CardDescription>
          Fill in the details below to post your job and find the right tradesperson
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {success && (
            <Alert>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="trade">Trade Required *</Label>
            <Select value={formData.trade} onValueChange={(value) => handleInputChange('trade', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a trade" />
              </SelectTrigger>
              <SelectContent>
                {tradeOptions.map((trade) => (
                  <SelectItem key={trade} value={trade}>
                    {trade}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="jobDescription" className="text-base font-semibold text-gray-800">
                Job Description *
              </Label>
              {formData.trade && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAISuggestions(!showAISuggestions)}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0 hover:from-purple-600 hover:to-blue-600 shadow-md transition-all duration-200 transform hover:scale-105"
                >
                  <span className="mr-1">✨</span>
                  AI Assistant
                </Button>
              )}
            </div>
            
            <Textarea
              id="jobDescription"
              placeholder="✍️ Describe your project in detail... Need inspiration? Try our AI Assistant above!"
              value={formData.jobDescription}
              onChange={(e) => handleInputChange('jobDescription', e.target.value)}
              onFocus={handleDescriptionFocus}
              rows={5}
              required
              className="border-2 border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all duration-200 text-base leading-relaxed"
            />
            

            {/* AI Suggestions Panel */}
            {showAISuggestions && formData.trade && (
              <div className="relative bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200 shadow-xl animate-in slide-in-from-top-2 duration-300">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✨</span>
                    </div>
                    <h4 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                      AI Suggestions for {formData.trade}
                    </h4>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAISuggestions(false)}
                    className="text-gray-400 hover:text-gray-600 hover:bg-white/50 rounded-full w-8 h-8 p-0"
                  >
                    ✕
                  </Button>
                </div>
                
                <p className="text-sm text-purple-700 mb-4 bg-white/50 p-3 rounded-lg border border-purple-200">
                  💡 <strong>Choose from these professional examples</strong> - Click any suggestion to instantly use it, then customize as needed!
                </p>
                
                <div className="space-y-3 max-h-72 overflow-y-auto pr-2 custom-scrollbar">
                  {getAISuggestions(formData.trade).map((suggestion, index) => (
                    <div
                      key={index}
                      className="group bg-white/80 backdrop-blur-sm p-4 rounded-xl border-2 border-purple-100 cursor-pointer hover:border-purple-300 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-white text-xs font-bold">{index + 1}</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-800 leading-relaxed mb-2">{suggestion}</p>
                          <div className="flex items-center text-xs text-purple-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="mr-1">👆</span>
                            Click to use this example
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                  <div className="flex items-center space-x-2">
                    <span className="text-green-500 text-lg">🎯</span>
                    <p className="text-sm text-green-800">
                      <strong>Pro tip:</strong> After selecting a suggestion, you can edit it to perfectly match your specific requirements!
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="postcode">Postcode *</Label>
            <Input
              id="postcode"
              type="text"
              placeholder="e.g., SW1A 1AA"
              value={formData.postcode}
              onChange={(e) => handleInputChange('postcode', e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budget">Budget</Label>
              <Input
                id="budget"
                type="number"
                placeholder="e.g., 500"
                value={formData.budget}
                onChange={(e) => handleInputChange('budget', e.target.value)}
                min="0"
                step="0.01"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="budgetType">Budget Type</Label>
              <Select value={formData.budgetType} onValueChange={(value) => handleInputChange('budgetType', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {budgetTypeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="preferredDate">Preferred Date</Label>
              <Input
                id="preferredDate"
                type="date"
                value={formData.preferredDate}
                onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="preferredTime">Preferred Time</Label>
              <Select value={formData.preferredTime} onValueChange={(value) => handleInputChange('preferredTime', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="images">Images (Optional)</Label>
            <Input
              id="images"
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              disabled={isSubmitting}
            />
            <p className="text-sm text-muted-foreground">
              Upload images to help tradespeople understand the job better
            </p>
          </div>

          {formData.images.length > 0 && (
            <div className="space-y-2">
              <Label>Uploaded Images</Label>
              <div className="flex flex-wrap gap-2">
                {formData.images.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Job image ${index + 1}`}
                    className="w-20 h-20 object-cover rounded border"
                  />
                ))}
              </div>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Posting Job...' : 'Post Job'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
} 