"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { TopBar } from "@/components/dashboard/top-bar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { PremiumLoader } from "@/components/ui/premium/premium-loader"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Bot,
  MessageSquare,
  Package,
  Truck,
  CreditCard,
  Settings,
  ChevronDown,
  Save,
  RotateCcw,
  Eye,
  Plus,
  ExternalLink,
  AlertTriangle,
  Sparkles,
} from "lucide-react"
import { TestChatWidget } from "@/components/chat/test-chat-widget"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { RequireFacebookPage } from "@/components/dashboard/require-facebook-page"

import { SmartCard } from "@/components/ui/premium/smart-card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

export default function AISetupPage() {
  // State for all settings
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  
  const [businessName, setBusinessName] = useState("Code and Cortex Fashion")
  const [greeting, setGreeting] = useState(`আসসালামু আলাইকুম! 👋
আমি Code and Cortex এর AI assistant।
আপনি কোন product খুঁজছেন?`)
  const [tone, setTone] = useState("friendly")
  const [bengaliPercent, setBengaliPercent] = useState([80])
  const [confidence, setConfidence] = useState([75])
  const [useEmojis, setUseEmojis] = useState(true)
  
  // Delivery
  const [deliveryInsideDhaka, setDeliveryInsideDhaka] = useState(60)
  const [deliveryOutsideDhaka, setDeliveryOutsideDhaka] = useState(120)
  const [deliveryTime, setDeliveryTime] = useState("3-5 business days")
  const [autoDelivery, setAutoDelivery] = useState(true)
  
  // Payment
  const [bkashEnabled, setBkashEnabled] = useState(true)
  const [bkashNumber, setBkashNumber] = useState("01915969330")
  const [nagadEnabled, setNagadEnabled] = useState(true)
  const [nagadNumber, setNagadNumber] = useState("01915969330")
  const [codEnabled, setCodEnabled] = useState(false)

  // Behavior Rules
  const [multiProduct, setMultiProduct] = useState(false)
  const [askSize, setAskSize] = useState(true)
  const [showStock, setShowStock] = useState(true)
  const [offerAlternatives, setOfferAlternatives] = useState(false)
  const [sendConfirmation, setSendConfirmation] = useState(true)
  const [showImageConfirmation, setShowImageConfirmation] = useState(true)

  // Fast Lane Messages
  const [fastLaneMessages, setFastLaneMessages] = useState({
    product_confirm: "দারুণ! 🎉\n\nআপনার সম্পূর্ণ নামটি বলবেন?\n(Example: Zayed Bin Hamid)",
    product_decline: "কোনো সমস্যা নেই! 😊\n\nঅন্য product এর ছবি পাঠান অথবা \"help\" লিখুন।",
    name_collected: "আপনার সাথে পরিচিত হয়ে ভালো লাগলো, {name}! 😊\n\nএখন আপনার ফোন নম্বর দিন। 📱\n(Example: 01712345678)",
    phone_collected: "পেয়েছি! 📱\n\nএখন আপনার ডেলিভারি ঠিকানাটি দিন। 📍\n(Example: House 123, Road 4, Dhanmondi, Dhaka)",
    order_confirmed: "✅ অর্ডারটি কনফার্ম করা হয়েছে!\n\nআপনার অর্ডার সফলভাবে সম্পন্ন হয়েছে। শীঘ্রই আমরা আপনার সাথে যোগাযোগ করবো।\n\nআমাদের সাথে কেনাকাটার জন্য ধন্যবাদ! 🎉",
    order_cancelled: "অর্ডার cancel করা হয়েছে। 😊\n\nকোনো সমস্যা নেই! নতুন অর্ডার করতে product এর ছবি পাঠান।",
    paymentInstructions: "✅ অর্ডার confirm হয়েছে!\n\n💰 Payment options:\n৳{totalAmount} টাকা পাঠান:\n{paymentNumber}\n\nPayment করার পর শেষের ২ ডিজিট (last 2 digits) পাঠান। 🔢\n\nExample: যদি transaction ID হয় BKC123456**78**, তাহলে পাঠান: 78",
    paymentReview: "ধন্যবাদ {name}! 🙏\n\nআপনার payment digits ({digits}) পেয়েছি। ✅\n\nআমরা এখন payment verify করবো। সফল হলে ৩ দিনের মধ্যে আপনার order deliver করা হবে। 📦\n\nআমাদের সাথে কেনাকাটার জন্য ধন্যবাদ! 🎉",
    invalidPaymentDigits: "⚠️ দুঃখিত! শুধু ২টা digit দিতে হবে।\n\nExample: 78 বা 45\n\nআবার চেষ্টা করুন। 🔢",
    // Dynamic interruption messages
    delivery_info: "🚚 Delivery Information:\n• ঢাকার মধ্যে: ৳60\n• ঢাকার বাইরে: ৳120\n• Delivery সময়: 3-5 business days",
    return_policy: "🔄 Return Policy:\nপণ্য হাতে পাওয়ার পর যদি মনে হয় এটা সঠিক নয়, তাহলে ২ দিনের মধ্যে ফেরত দিতে পারবেন।\n\n• পণ্য অব্যবহৃত থাকতে হবে\n• Original packaging এ থাকতে হবে\n• ২ দিনের মধ্যে আমাদের জানাতে হবে",
    payment_info: "💳 Payment Methods:\nআমরা নিম্নলিখিত payment methods গ্রহণ করি:\n\n• bKash: 01915969330\n• Nagad: 01915969330\n• Cash on Delivery\n\nযেকোনো method দিয়ে payment করতে পারবেন।"
  })

  // Order Collection Style
  const [orderCollectionStyle, setOrderCollectionStyle] = useState<'conversational' | 'quick_form'>('quick_form')
  const [quickFormPrompt, setQuickFormPrompt] = useState('দারুণ! অর্ডারটি সম্পন্ন করতে, অনুগ্রহ করে নিচের ফর্ম্যাট অনুযায়ী আপনার তথ্য দিন:\n\nনাম:\nফোন:\nসম্পূর্ণ ঠিকানা:')
  const [quickFormError, setQuickFormError] = useState('দুঃখিত, আমি আপনার তথ্যটি সঠিকভাবে বুঝতে পারিনি। 😔\n\nঅনুগ্রহ করে নিচের ফর্ম্যাটে আবার দিন:\n\nনাম: আপনার নাম\nফোন: 017XXXXXXXX\nঠিকানা: আপনার সম্পূর্ণ ঠিকানা\n\nঅথবা একটি লাইন করে দিতে পারেন:\nআপনার নাম\n017XXXXXXXX\nআপনার সম্পূর্ণ ঠিকানা')
  const [outOfStockMessage, setOutOfStockMessage] = useState('দুঃখিত! 😔 "{productName}" এখন স্টকে নেই।\n\nআপনি চাইলে অন্য পণ্যের নাম লিখুন বা স্ক্রিনশট পাঠান। আমরা সাহায্য করতে পারবো! 🛍️')

  const [advancedOpen, setAdvancedOpen] = useState(false)

  const toneExamples = {
    friendly: "দারুণ! এটা আমাদের Red Saree! 😊 Price: ৳3,000",
    professional: "This is our Red Saree. Price: ৳3,000. Delivery available.",
    casual: "Aye! Red Saree ta kemon? ৳3,000 only!",
  }

  // Fetch settings on mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/settings/ai')
        const data = await response.json()
        
        if (data.settings) {
          const s = data.settings
          setBusinessName(s.business_name || "Code and Cortex Fashion")
          setGreeting(s.greeting_message || greeting)
          setTone(s.conversation_tone || "friendly")
          setBengaliPercent([s.bengali_percent || 80])
          setConfidence([s.confidence_threshold || 75])
          setUseEmojis(s.use_emojis ?? true)
          
          setDeliveryInsideDhaka(s.delivery_charge_inside_dhaka || 60)
          setDeliveryOutsideDhaka(s.delivery_charge_outside_dhaka || 120)
          setDeliveryTime(s.delivery_time || "3-5 business days")
          setAutoDelivery(s.auto_mention_delivery ?? true)
          
          // Payment
          if (s.payment_methods) {
            setBkashEnabled(s.payment_methods.bkash?.enabled ?? true)
            setBkashNumber(s.payment_methods.bkash?.number || "01915969330")
            setNagadEnabled(s.payment_methods.nagad?.enabled ?? true)
            setNagadNumber(s.payment_methods.nagad?.number || "01915969330")
            setCodEnabled(s.payment_methods.cod?.enabled ?? false)
          }

          
          // Behavior
          if (s.behavior_rules) {
            setMultiProduct(s.behavior_rules.multiProduct ?? false)
            setAskSize(s.behavior_rules.askSize ?? true)
            setShowStock(s.behavior_rules.showStock ?? true)
            setOfferAlternatives(s.behavior_rules.offerAlternatives ?? false)
            setSendConfirmation(s.behavior_rules.sendConfirmation ?? true)
          }
          setShowImageConfirmation(s.show_image_confirmation ?? true)
          
          // Fast Lane
          if (s.fast_lane_messages) {
            setFastLaneMessages({ ...fastLaneMessages, ...s.fast_lane_messages })
          }
          
          // Order Collection Style
          setOrderCollectionStyle(s.order_collection_style || 'conversational')
          setQuickFormPrompt(s.quick_form_prompt || quickFormPrompt)
          setQuickFormError(s.quick_form_error || quickFormError)
          setOutOfStockMessage(s.out_of_stock_message || outOfStockMessage)
        }
      } catch (error) {
        console.error("Error fetching settings:", error)
        toast.error("Failed to load settings")
      } finally {
        setLoading(false)
      }
    }
    
    fetchSettings()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      const payload = {
        businessName,
        greeting,
        tone,
        bengaliPercent: bengaliPercent[0],
        confidenceThreshold: confidence[0],
        useEmojis,
        deliveryCharges: {
          insideDhaka: deliveryInsideDhaka,
          outsideDhaka: deliveryOutsideDhaka
        },
        deliveryTime,
        autoMentionDelivery: autoDelivery,
        paymentMethods: {
          bkash: { enabled: bkashEnabled, number: bkashNumber },
          nagad: { enabled: nagadEnabled, number: nagadNumber },
          cod: { enabled: codEnabled }
        },

        behaviorRules: {
          multiProduct,
          askSize,
          showStock,
          offerAlternatives,
          sendConfirmation
        },
        showImageConfirmation,
        fastLaneMessages,
        order_collection_style: orderCollectionStyle,
        quick_form_prompt: quickFormPrompt,
        quick_form_error: quickFormError,
        out_of_stock_message: outOfStockMessage,
      }

      const response = await fetch('/api/settings/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        toast.success("Settings saved successfully!")
      } else {
        throw new Error("Failed to save")
      }
    } catch (error) {
      console.error("Error saving settings:", error)
      toast.error("Failed to save settings")
    } finally {
      setSaving(false)
    }
  }

  const handleReset = () => {
    setBusinessName("Code and Cortex Fashion")
    setGreeting(`আসসালামু আলাইকুম! 👋
আমি Code and Cortex এর AI assistant।
আপনি কোন product খুঁজছেন?`)
    setTone("friendly")
    setBengaliPercent([80])
    setConfidence([75])
    setUseEmojis(true)
    
    setDeliveryInsideDhaka(60)
    setDeliveryOutsideDhaka(120)
    setDeliveryTime("3-5 business days")
    setAutoDelivery(true)
    
    setBkashEnabled(true)
    setBkashNumber("01915969330")
    setNagadEnabled(true)
    setNagadNumber("01915969330")
    setCodEnabled(false)
    
    setMultiProduct(false)
    setAskSize(true)
    setShowStock(true)
    setOfferAlternatives(false)
    setSendConfirmation(true)
    setShowImageConfirmation(true)
    
    setFastLaneMessages({
      product_confirm: "দারুণ! 🎉\n\nআপনার সম্পূর্ণ নামটি বলবেন?\n(Example: Zayed Bin Hamid)",
      product_decline: "কোনো সমস্যা নেই! 😊\n\nঅন্য product এর ছবি পাঠান অথবা \"help\" লিখুন।",
      name_collected: "আপনার সাথে পরিচিত হয়ে ভালো লাগলো, {name}! 😊\n\nএখন আপনার ফোন নম্বর দিন। 📱\n(Example: 01712345678)",
      phone_collected: "পেয়েছি! 📱\n\nএখন আপনার ডেলিভারি ঠিকানাটি দিন। 📍\n(Example: House 123, Road 4, Dhanmondi, Dhaka)",
      order_confirmed: "✅ অর্ডারটি কনফার্ম করা হয়েছে!\n\nআপনার অর্ডার সফলভাবে সম্পন্ন হয়েছে। শীঘ্রই আমরা আপনার সাথে যোগাযোগ করবো।\n\nআমাদের সাথে কেনাকাটার জন্য ধন্যবাদ! 🎉",
      order_cancelled: "অর্ডার cancel করা হয়েছে। 😊\n\nকোনো সমস্যা নেই! নতুন অর্ডার করতে product এর ছবি পাঠান।",
      paymentInstructions: "✅ অর্ডার confirm হয়েছে!\n\n💰 Payment options:\n৳{totalAmount} টাকা পাঠান:\n{paymentNumber}\n\nPayment করার পর শেষের ২ ডিজিট (last 2 digits) পাঠান। 🔢\n\nExample: যদি transaction ID হয় BKC123456**78**, তাহলে পাঠান: 78",
      paymentReview: "ধন্যবাদ {name}! 🙏\n\nআপনার payment digits ({digits}) পেয়েছি। ✅\n\nআমরা এখন payment verify করবো। সফল হলে ৩ দিনের মধ্যে আপনার order deliver করা হবে। 📦\n\nআমাদের সাথে কেনাকাটার জন্য ধন্যবাদ! 🎉",
      invalidPaymentDigits: "⚠️ দুঃখিত! শুধু ২টা digit দিতে হবে।\n\nExample: 78 বা 45\n\nআবার চেষ্টা করুন। 🔢",
      // Dynamic interruption messages
      delivery_info: "🚚 Delivery Information:\n• ঢাকার মধ্যে: ৳60\n• ঢাকার বাইরে: ৳120\n• Delivery সময়: 3-5 business days",
      return_policy: "🔄 Return Policy:\nপণ্য হাতে পাওয়ার পর যদি মনে হয় এটা সঠিক নয়, তাহলে ২ দিনের মধ্যে ফেরত দিতে পারবেন।\n\n• পণ্য অব্যবহৃত থাকতে হবে\n• Original packaging এ থাকতে হবে\n• ২ দিনের মধ্যে আমাদের জানাতে হবে",
      payment_info: "💳 Payment Methods:\nআমরা নিম্নলিখিত payment methods গ্রহণ করি:\n\n• bKash: 01915969330\n• Nagad: 01915969330\n• Cash on Delivery\n\nযেকোনো method দিয়ে payment করতে পারবেন।"
    })
    
    setOrderCollectionStyle('conversational')
    setQuickFormPrompt('দারুণ! অর্ডারটি সম্পন্ন করতে, অনুগ্রহ করে নিচের ফর্ম্যাট অনুযায়ী আপনার তথ্য দিন:\n\nনাম:\nফোন:\nসম্পূর্ণ ঠিকানা:')
    setQuickFormError('দুঃখিত, আমি আপনার তথ্যটি সঠিকভাবে বুঝতে পারিনি। 😔\n\nঅনুগ্রহ করে নিচের ফর্ম্যাটে আবার দিন:\n\nনাম: আপনার নাম\nফোন: 017XXXXXXXX\nঠিকানা: আপনার সম্পূর্ণ ঠিকানা\n\nঅথবা একটি লাইন করে দিতে পারেন:\nআপনার নাম\n017XXXXXXXX\nআপনার সম্পূর্ণ ঠিকানা')
    setOutOfStockMessage('দুঃখিত! 😔 "{productName}" এখন স্টকে নেই।\n\nআপনি চাইলে অন্য পণ্যের নাম লিখুন বা স্ক্রিনশট পাঠান। আমরা সাহায্য করতে পারবো! 🛍️')
    
    toast.success("Settings reset to default")
  }

  if (loading) {
    return <PremiumLoader />
  }

  return (
    <RequireFacebookPage>
      <TopBar title="AI Setup" />

      <div className="max-w-[1800px] mx-auto p-4 lg:p-8 space-y-8 pb-32">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white flex items-center gap-3">
              <Bot className="h-8 w-8 text-black dark:text-white" />
              AI Configuration
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg">
              Customize your digital assistant's personality and operational logic.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" className="text-zinc-500 hover:text-red-600 dark:text-zinc-400 dark:hover:text-red-400">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset Defaults
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Reset all settings?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will revert your AI settings to the recommended defaults. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleReset} className="bg-red-600 hover:bg-red-700">
                    Yes, Reset
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-zinc-200 dark:border-white/10 dark:bg-white/5 dark:text-white">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview Bot
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl h-[80vh] flex flex-col p-0 gap-0 overflow-hidden bg-zinc-50 dark:bg-black border-zinc-200 dark:border-white/10">
                <TestChatWidget />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Main Masonry Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Identity & Operations (7/12) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Identity Card */}
            <SmartCard variant="static" className="p-6 md:p-8 space-y-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-xl bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center">
                  <Bot className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Identity & Voice</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">Define who your bot is and how it speaks.</p>
                </div>
              </div>

              <div className="grid gap-6">
                {/* Business Name */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Business Name</Label>
                  <Input 
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="bg-zinc-50 border-zinc-200 focus:ring-black dark:bg-white/5 dark:border-white/10 dark:focus:ring-white h-11"
                    placeholder="e.g. Code and Cortex Fashion"
                  />
                  <p className="text-xs text-zinc-400">This name appears in the bot's introduction.</p>
                </div>

                {/* Greeting */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Greeting Message</Label>
                  <Textarea
                    value={greeting}
                    onChange={(e) => setGreeting(e.target.value)}
                    rows={4}
                    className="bg-zinc-50 border-zinc-200 focus:ring-black dark:bg-white/5 dark:border-white/10 dark:focus:ring-white resize-none"
                  />
                </div>

                {/* Combined Settings Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                  {/* Tone Selector */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold">Conversation Tone</Label>
                    <RadioGroup value={tone} onValueChange={setTone} className="grid grid-cols-1 gap-2">
                       {['friendly', 'professional', 'casual'].map((t) => (
                         <div key={t} className={cn(
                           "relative flex items-center space-x-3 rounded-lg border p-3 cursor-pointer transition-all",
                           tone === t 
                             ? "border-black bg-zinc-50 dark:border-white dark:bg-white/5" 
                             : "border-zinc-200 hover:border-zinc-300 dark:border-white/10 dark:hover:border-white/20"
                         )}
                         onClick={() => setTone(t)}
                         >
                           <RadioGroupItem value={t} id={t} />
                           <div className="flex-1">
                             <Label htmlFor={t} className="font-semibold capitalize cursor-pointer">{t}</Label>
                             <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 line-clamp-1">
                               {toneExamples[t as keyof typeof toneExamples]}
                             </p>
                           </div>
                         </div>
                       ))}
                    </RadioGroup>
                  </div>
                  
                  {/* Language + Confidence */}
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex justify-between">
                         <Label className="font-semibold">Language Mix</Label>
                         <span className="text-xs font-mono bg-zinc-100 dark:bg-white/10 px-2 py-0.5 rounded">
                           {bengaliPercent[0]}% Bengali
                         </span>
                      </div>
                      <Slider
                        value={bengaliPercent}
                        onValueChange={setBengaliPercent}
                        max={100}
                        step={5}
                        className="py-2"
                      />
                      <div className="flex justify-between text-xs text-zinc-400">
                        <span>Mostly English</span>
                        <span>Minglish</span>
                        <span>Pure Bengali</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between">
                         <Label className="font-semibold">AI Confidence Threshold</Label>
                         <span className="text-xs font-mono bg-zinc-100 dark:bg-white/10 px-2 py-0.5 rounded">
                           {confidence[0]}%
                         </span>
                      </div>
                      <Slider
                        value={confidence}
                        onValueChange={setConfidence}
                        max={100}
                        step={5}
                        className="py-2"
                      />
                      <p className="text-xs text-zinc-400">
                        Minimum confidence required before the AI answers automatically.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </SmartCard>

            {/* Operations Card */}
            <SmartCard variant="static" className="p-6 md:p-8 space-y-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-xl bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center">
                  <Settings className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Operational Logic</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">How the bot handles orders and flows.</p>
                </div>
              </div>

               {/* Collection Style - Visually Enhanced */}
               <div className="space-y-4">
                 <Label className="text-sm font-semibold">Order Collection Style</Label>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div 
                     className={cn(
                       "border-2 rounded-xl p-4 cursor-pointer transition-all relative overflow-hidden",
                       orderCollectionStyle === 'quick_form'
                         ? "border-blue-600 bg-blue-50/50 dark:border-blue-500 dark:bg-blue-500/10"
                         : "border-zinc-200 hover:border-zinc-300 dark:border-white/10 dark:hover:border-white/20"
                     )}
                     onClick={() => setOrderCollectionStyle('quick_form')}
                   >
                     <div className="flex justify-between items-start mb-2">
                       <span className="font-bold text-zinc-900 dark:text-white">️⚡ Quick Form</span>
                       {orderCollectionStyle === 'quick_form' && <div className="h-3 w-3 bg-blue-600 rounded-full" />}
                     </div>
                     <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                       Asks for all details (Name, Phone, Address) in a single message.
                       <br/><span className="font-semibold text-blue-600 dark:text-blue-400">Best for speed.</span>
                     </p>
                   </div>

                   <div 
                     className={cn(
                       "border-2 rounded-xl p-4 cursor-pointer transition-all relative overflow-hidden",
                       orderCollectionStyle === 'conversational'
                         ? "border-blue-600 bg-blue-50/50 dark:border-blue-500 dark:bg-blue-500/10"
                         : "border-zinc-200 hover:border-zinc-300 dark:border-white/10 dark:hover:border-white/20"
                     )}
                     onClick={() => setOrderCollectionStyle('conversational')}
                   >
                     <div className="flex justify-between items-start mb-2">
                       <span className="font-bold text-zinc-900 dark:text-white">💬 Conversational</span>
                        {orderCollectionStyle === 'conversational' && <div className="h-3 w-3 bg-blue-600 rounded-full" />}
                     </div>
                     <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                       Collects details step-by-step. "What is your name?", "Then phone?"...
                       <br/><span className="font-semibold text-blue-600 dark:text-blue-400">Best for engagement.</span>
                     </p>
                   </div>
                 </div>
               </div>

               {/* Conditional Inputs based on Selection */}
               <div className="space-y-4 pt-2">
                 {orderCollectionStyle === 'quick_form' && (
                   <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                     <div className="space-y-2">
                       <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Quick Form Prompt Message</Label>
                       <Textarea
                         value={quickFormPrompt}
                         onChange={(e) => setQuickFormPrompt(e.target.value)}
                         placeholder="Message asking for name, phone, and address..."
                         rows={4}
                         className="bg-zinc-50 border-zinc-200 focus:ring-black dark:bg-white/5 dark:border-white/10 dark:focus:ring-white resize-none"
                       />
                       <p className="text-xs text-zinc-400">Shown when customer confirms they want to order.</p>
                     </div>

                     <div className="space-y-2">
                       <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Quick Form Error Message</Label>
                       <Textarea
                         value={quickFormError}
                         onChange={(e) => setQuickFormError(e.target.value)}
                         placeholder="Error message when parsing fails..."
                         rows={4}
                         className="bg-zinc-50 border-zinc-200 focus:ring-black dark:bg-white/5 dark:border-white/10 dark:focus:ring-white resize-none"
                       />
                       <p className="text-xs text-zinc-400">Shown when the bot cannot parse the customer's info.</p>
                     </div>
                   </div>
                 )}

                 {orderCollectionStyle === 'conversational' && (
                   <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                     <div className="space-y-2">
                       <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Product Confirmation (Ask for Name)</Label>
                       <Textarea
                         rows={3}
                         value={fastLaneMessages.product_confirm}
                         onChange={(e) => setFastLaneMessages({...fastLaneMessages, product_confirm: e.target.value})}
                         placeholder="Message when user confirms product..."
                         className="bg-zinc-50 border-zinc-200 focus:ring-black dark:bg-white/5 dark:border-white/10 dark:focus:ring-white resize-none"
                       />
                       <p className="text-xs text-zinc-400">Step 1: Ask for their name.</p>
                     </div>

                     <div className="space-y-2">
                       <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Name Collected (Ask for Phone)</Label>
                       <Textarea
                         rows={3}
                         value={fastLaneMessages.name_collected}
                         onChange={(e) => setFastLaneMessages({...fastLaneMessages, name_collected: e.target.value})}
                         placeholder="Message after collecting name..."
                         className="bg-zinc-50 border-zinc-200 focus:ring-black dark:bg-white/5 dark:border-white/10 dark:focus:ring-white resize-none"
                       />
                       <p className="text-xs text-zinc-400">Step 2: Ask for phone number. Use {"{name}"}.</p>
                     </div>

                     <div className="space-y-2">
                       <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Phone Collected (Ask for Address)</Label>
                       <Textarea
                         rows={3}
                         value={fastLaneMessages.phone_collected}
                         onChange={(e) => setFastLaneMessages({...fastLaneMessages, phone_collected: e.target.value})}
                         placeholder="Message after collecting phone..."
                         className="bg-zinc-50 border-zinc-200 focus:ring-black dark:bg-white/5 dark:border-white/10 dark:focus:ring-white resize-none"
                       />
                       <p className="text-xs text-zinc-400">Step 3: Ask for delivery address.</p>
                     </div>
                     
                     <div className="space-y-2">
                       <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Product Decline Message</Label>
                       <Textarea
                         rows={2}
                         value={fastLaneMessages.product_decline}
                         onChange={(e) => setFastLaneMessages({...fastLaneMessages, product_decline: e.target.value})}
                         placeholder="Message when user declines product..."
                         className="bg-zinc-50 border-zinc-200 focus:ring-black dark:bg-white/5 dark:border-white/10 dark:focus:ring-white resize-none"
                       />
                     </div>
                   </div>
                 )}
               </div>

               <Separator className="bg-zinc-100 dark:bg-white/10" />

               {/* Behavior Switches */}
               <div className="space-y-4">
                 <Label className="text-sm font-semibold mb-2 block">Behavior Rules</Label>
                 <div className="relative">
                   {/* Coming Soon Overlay */}
                   <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50 dark:bg-black/50 backdrop-blur-[1px] rounded-lg">
                     <Badge variant="secondary" className="bg-zinc-900 text-white dark:bg-white dark:text-black px-4 py-1.5 h-auto text-xs font-bold gap-2 shadow-xl">
                       <Sparkles className="h-3 w-3" />
                       Coming Soon
                     </Badge>
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 opacity-40 pointer-events-none">
                     {[
                       { label: "Handle Multi-Product Orders", desc: "Allow bot to process multiple items at once" },
                       { label: "Ask for Size/Color", desc: "Always confirm variants before ordering" },
                       { label: "Check Stock Levels", desc: "Verify inventory before confirming" },
                       { label: "Suggest Alternatives", desc: "Offer similar items if OOS" },
                       { label: "Send Order Confirmation", desc: "Send summary message after order" },
                       { label: "Image Confirmation", desc: "Show product image in summary" },
                     ].map((item, i) => (
                       <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-zinc-100 dark:border-white/5 bg-zinc-50/50 dark:bg-white/5">
                         <div className="space-y-0.5">
                           <Label className="text-sm font-medium">{item.label}</Label>
                           <p className="text-[10px] text-zinc-500 dark:text-zinc-400">{item.desc}</p>
                         </div>
                         <Switch checked={false} disabled />
                       </div>
                     ))}
                  </div>
                 </div>

                 <Separator className="bg-zinc-100 dark:bg-white/10" />

                 {/* Out of Stock Message */}
                 <div className="space-y-4 pt-2">
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Out of Stock Message</Label>
                      <Textarea
                        value={outOfStockMessage}
                        onChange={(e) => setOutOfStockMessage(e.target.value)}
                        rows={3}
                        placeholder="Message when product is out of stock..."
                        className="bg-zinc-50 border-zinc-200 focus:ring-black dark:bg-white/5 dark:border-white/10 dark:focus:ring-white resize-none"
                      />
                      <p className="text-xs text-zinc-400">
                        Use {"{productName}"} to include the product name.
                      </p>
                  </div>
               </div>
               </div>
            </SmartCard>

           {/* Fast Lane Messages Card */}
           <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
             <SmartCard variant="static" className="p-6 md:p-8 space-y-8">
               <div className="flex items-center gap-3 mb-6">
                 <div className="h-10 w-10 rounded-xl bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center">
                   <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                 </div>
                 <div>
                   <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Fast Lane Messages</h3>
                   <p className="text-sm text-zinc-500 dark:text-zinc-400">Customize bot responses for common interactions. Use {"{name}"} as placeholders.</p>
                 </div>
               </div>

               <div className="space-y-6">
                 {/* Order Confirmed */}
                 <div className="space-y-2">
                   <div className="flex items-center gap-2">
                     <div className="h-2 w-2 rounded-full bg-green-500" />
                     <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Order Confirmed</Label>
                   </div>
                   <Textarea
                     rows={3}
                     value={fastLaneMessages.order_confirmed}
                     onChange={(e) => setFastLaneMessages({...fastLaneMessages, order_confirmed: e.target.value})}
                     className="bg-zinc-50 border-zinc-200 focus:ring-black dark:bg-white/5 dark:border-white/10 dark:focus:ring-white resize-none font-mono text-sm"
                   />
                   <p className="text-xs text-zinc-400">Final success message after order confirmation. Use {"{name}"} as placeholder.</p>
                 </div>

                 {/* Order Cancelled */}
                 <div className="space-y-2">
                   <div className="flex items-center gap-2">
                     <div className="h-2 w-2 rounded-full bg-orange-500" />
                     <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Order Cancelled</Label>
                   </div>
                   <Textarea
                     rows={2}
                     value={fastLaneMessages.order_cancelled}
                     onChange={(e) => setFastLaneMessages({...fastLaneMessages, order_cancelled: e.target.value})}
                     className="bg-zinc-50 border-zinc-200 focus:ring-black dark:bg-white/5 dark:border-white/10 dark:focus:ring-white resize-none font-mono text-sm"
                   />
                   <p className="text-xs text-zinc-400">Shown when user cancels the order.</p>
                 </div>

                 <Separator className="bg-zinc-100 dark:bg-white/10" />

                 {/* Payment Instructions */}
                 <div className="space-y-2">
                   <div className="flex items-center gap-2">
                     <div className="h-2 w-2 rounded-full bg-green-500" />
                     <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Payment Instructions</Label>
                   </div>
                   <Textarea
                     rows={5}
                     value={fastLaneMessages.paymentInstructions}
                     onChange={(e) => setFastLaneMessages({...fastLaneMessages, paymentInstructions: e.target.value})}
                     className="bg-zinc-50 border-zinc-200 focus:ring-black dark:bg-white/5 dark:border-white/10 dark:focus:ring-white resize-none font-mono text-sm"
                   />
                   <div className="flex items-center gap-2 text-xs text-zinc-400 bg-zinc-50 dark:bg-white/5 p-2 rounded border border-zinc-100 dark:border-white/5">
                      <AlertTriangle className="h-3 w-3 text-amber-500" />
                      <span>Use placeholders: {"{totalAmount}"} (required), {"{paymentNumber}"} (auto-filled)</span>
                   </div>
                 </div>

                 {/* Payment Review */}
                 <div className="space-y-2">
                   <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Payment Review</Label>
                   <Textarea
                     rows={4}
                     value={fastLaneMessages.paymentReview}
                     onChange={(e) => setFastLaneMessages({...fastLaneMessages, paymentReview: e.target.value})}
                     className="bg-zinc-50 border-zinc-200 focus:ring-black dark:bg-white/5 dark:border-white/10 dark:focus:ring-white resize-none font-mono text-sm"
                   />
                   <p className="text-xs text-zinc-400">Use {"{name}"} and {"{digits}"} placeholders.</p>
                 </div>

                 {/* Invalid Payment Digits */}
                 <div className="space-y-2">
                   <div className="flex items-center gap-2">
                     <div className="h-2 w-2 rounded-full bg-red-500" />
                     <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Invalid Payment Digits</Label>
                   </div>
                   <Textarea
                     rows={3}
                     value={fastLaneMessages.invalidPaymentDigits}
                     onChange={(e) => setFastLaneMessages({...fastLaneMessages, invalidPaymentDigits: e.target.value})}
                     className="bg-zinc-50 border-zinc-200 focus:ring-black dark:bg-white/5 dark:border-white/10 dark:focus:ring-white resize-none font-mono text-sm"
                   />
                   <p className="text-xs text-zinc-400">Shown when input is not 2 digits.</p>
                 </div>
               </div>
             </SmartCard>
           </div>
         </div>

          {/* RIGHT COLUMN: Logistics & Policy (5/12) */}
          <div className="lg:col-span-5 space-y-8 sticky lg:top-8">
             
             {/* Logistics Card */}
             <SmartCard variant="static" className="p-6 md:p-8 space-y-8">
               <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-xl bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center">
                  <Truck className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Logistics</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">Delivery & Payments</p>
                </div>
              </div>

              {/* Delivery Config */}
              <div className="space-y-5">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Delivery Fees</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs">Inside Dhaka</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-zinc-400">৳</span>
                      <Input 
                        type="number" 
                        value={deliveryInsideDhaka} 
                        onChange={(e) => setDeliveryInsideDhaka(Number(e.target.value))}
                        className="pl-8 bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Outside Dhaka</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-zinc-400">৳</span>
                      <Input 
                        type="number" 
                        value={deliveryOutsideDhaka} 
                        onChange={(e) => setDeliveryOutsideDhaka(Number(e.target.value))}
                        className="pl-8 bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10" 
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                    <Label className="text-xs">Estimated Time</Label>
                    <Input 
                      value={deliveryTime} 
                      onChange={(e) => setDeliveryTime(e.target.value)}
                      className="bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10" 
                      placeholder="e.g. 3-5 days"
                    />
                </div>

                <div className="flex items-center space-x-2 pt-2">
                    <Checkbox
                      id="auto-delivery"
                      checked={autoDelivery}
                      onCheckedChange={(c) => setAutoDelivery(!!c)}
                    />
                    <Label htmlFor="auto-delivery" className="font-normal text-sm cursor-pointer">
                      Auto-mention delivery info in conversations
                    </Label>
                </div>

                <div className="space-y-2">
                    <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Delivery Information Message</Label>
                    <Textarea
                      id="delivery-msg"
                      rows={4}
                      value={fastLaneMessages.delivery_info}
                      onChange={(e) => setFastLaneMessages({...fastLaneMessages, delivery_info: e.target.value})}
                      placeholder="Message when customer asks about delivery..."
                      className="bg-zinc-50 border-zinc-200 focus:ring-black dark:bg-white/5 dark:border-white/10 dark:focus:ring-white resize-none"
                    />
                    <p className="text-xs text-zinc-400">
                      Shown when customer asks: "delivery charge?", "কত দিন?", etc.
                    </p>
                </div>
              </div>

              <Separator className="bg-zinc-100 dark:bg-white/10" />

              {/* Payment Methods */}
              <div className="space-y-5">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Payment Methods</h4>
                
                {/* bKash */}
                <div className="p-3 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50/50 dark:bg-white/5 space-y-3">
                   <div className="flex items-center justify-between">
                     <div className="flex items-center gap-2">
                       <div className="h-6 w-6 rounded bg-[#E2136E] text-white flex items-center justify-center text-[10px] font-bold">b</div>
                       <Label className="font-semibold">bKash</Label>
                     </div>
                     <Switch checked={bkashEnabled} onCheckedChange={setBkashEnabled} />
                   </div>
                   {bkashEnabled && (
                     <Input 
                       value={bkashNumber}
                       onChange={(e) => setBkashNumber(e.target.value)}
                       placeholder="01XXXXXXXXX"
                       className="bg-white dark:bg-black/20 h-9 text-sm"
                     />
                   )}
                </div>

                {/* Nagad */}
                <div className="p-3 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50/50 dark:bg-white/5 space-y-3">
                   <div className="flex items-center justify-between">
                     <div className="flex items-center gap-2">
                       <div className="h-6 w-6 rounded bg-[#EC1D25] text-white flex items-center justify-center text-[10px] font-bold">N</div>
                       <Label className="font-semibold">Nagad</Label>
                     </div>
                     <Switch checked={nagadEnabled} onCheckedChange={setNagadEnabled} />
                   </div>
                   {nagadEnabled && (
                     <Input 
                       value={nagadNumber}
                       onChange={(e) => setNagadNumber(e.target.value)}
                       placeholder="01XXXXXXXXX"
                       className="bg-white dark:bg-black/20 h-9 text-sm"
                     />
                   )}
                </div>

                {/* COD */}
                <div className="flex items-center justify-between p-3 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50/50 dark:bg-white/5">
                   <div className="flex items-center gap-2">
                     <CreditCard className="h-5 w-5 text-zinc-500" />
                     <Label className="font-semibold">Cash On Delivery</Label>
                   </div>
                   <Switch checked={codEnabled} onCheckedChange={setCodEnabled} />
                </div>

                <div className="space-y-2 pt-2">
                    <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Payment Information Message</Label>
                    <Textarea
                      rows={5}
                      value={fastLaneMessages.payment_info}
                      onChange={(e) => setFastLaneMessages({...fastLaneMessages, payment_info: e.target.value})}
                      placeholder="Message when customer asks about payment methods..."
                      className="bg-zinc-50 border-zinc-200 focus:ring-black dark:bg-white/5 dark:border-white/10 dark:focus:ring-white resize-none"
                    />
                    <p className="text-xs text-zinc-400">
                      Shown when customer asks: "payment?", "কিভাবে?", "bKash?", etc.
                    </p>
                </div>

                <Separator className="bg-zinc-100 dark:bg-white/10" />

                <div className="space-y-2 pt-2">
                    <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Return Policy Message</Label>
                    <Textarea
                      rows={5}
                      value={fastLaneMessages.return_policy}
                      onChange={(e) => setFastLaneMessages({...fastLaneMessages, return_policy: e.target.value})}
                      placeholder="Your return and exchange policy..."
                      className="bg-zinc-50 border-zinc-200 focus:ring-black dark:bg-white/5 dark:border-white/10 dark:focus:ring-white resize-none"
                    />
                    <p className="text-xs text-zinc-400">
                      Shown when customer asks: "return?", "exchange?", "ফেরত?", etc.
                    </p>
                </div>
              </div>
             </SmartCard>

             {/* Policy & Messages Card (Collapsible for neatness) */}
             <SmartCard variant="static" className="p-6 md:p-8">
               <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-xl bg-green-100 dark:bg-green-500/20 flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Templates</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">Edit automated replies.</p>
                </div>
              </div>

               <div className="relative">
                 {/* Coming Soon Overlay */}
                 <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50 dark:bg-black/50 backdrop-blur-[1px] rounded-lg">
                   <Badge variant="secondary" className="bg-zinc-900 text-white dark:bg-white dark:text-black px-4 py-1.5 h-auto text-xs font-bold gap-2 shadow-xl">
                     <Sparkles className="h-3 w-3" />
                     Coming Soon
                   </Badge>
                 </div>
                 
                 <div className="opacity-40 pointer-events-none">
                   <Collapsible open={false}>
                    <div className="flex items-center justify-between p-3 rounded-lg border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/5">
                      <span className="font-medium">Advanced Message Templates</span>
                      <ChevronDown className="h-4 w-4" />
                    </div>
                   </Collapsible>
                 </div>
              </div>
             </SmartCard>

          </div>
        </div>

        {/* Floating Action Bar */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-lg border-t border-zinc-200 dark:border-white/10 z-40 lg:pl-72">
           <div className="max-w-[1600px] mx-auto flex items-center justify-between">
              <p className="text-sm text-zinc-500 hidden sm:block">
                {saving ? "Saving changes..." : "Unsaved changes are visible to customers immediately after saving."}
              </p>
              <Button 
                onClick={handleSave} 
                disabled={saving}
                size="lg"
                className="w-full sm:w-auto min-w-[150px] shadow-xl md:mr-8 bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
              >
                {saving ? (
                  <>
                    <div className="h-4 w-4 rounded-full border-2 border-white/20 border-t-white animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Configuration
                  </>
                )}
              </Button>
           </div>
        </div>
      </div>
    </RequireFacebookPage>
  )
}
