'use server';

import { FormService } from '@/services/FormService';
import { MarketingService, MarketingCampaign } from '@/services/MarketingService';
import { ResourceService } from '@/services/ResourceService';
import { Form, Resource } from '@/types/custom';
import { revalidatePath } from 'next/cache';

/**
 * Forms Actions
 */
export async function createFormAction(form: Partial<Form>) {
    const result = await FormService.createForm(form);
    revalidatePath('/dashboard/admin/forms');
    return result;
}

export async function deleteFormAction(id: string) {
    const result = await FormService.deleteForm(id);
    revalidatePath('/dashboard/admin/forms');
    return result;
}

/**
 * Marketing Actions
 */
export async function createCampaignAction(campaign: Partial<MarketingCampaign>) {
    const result = await MarketingService.createCampaign(campaign);
    revalidatePath('/dashboard/admin/marketing');
    return result;
}

/**
 * Library Actions
 */
export async function createResourceAction(resource: Partial<Resource>) {
    const result = await ResourceService.createResource(resource);
    revalidatePath('/dashboard/admin/library');
    return result;
}

export async function deleteResourceAction(id: string) {
    const result = await ResourceService.deleteResource(id);
    revalidatePath('/dashboard/admin/library');
}
