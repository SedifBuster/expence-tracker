import { useProfileStore } from "../model/store";
import { useEffect, useState } from "react";
import { Button, Input } from "@headlessui/react";


export function ProfileEditor () {

  const { profile, isLoading, fetchProfile, updateProfile } = useProfileStore()

  const [formData, setFormData] = useState({
    username: '',
    full_name: '',
    website: '',
  })





  return (
    <form className="space-y-4">
      <Input
        //label="Username"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      />
      
      <Input
        //label="Full Name"
        value={formData.full_name}
        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
      />
      
      <Input
        //label="Website"
        value={formData.website}
        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
      />
      
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Сохранение...' : 'Сохранить'}
      </Button>
    </form>
  )
}